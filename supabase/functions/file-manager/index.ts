import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const pathname = url.pathname;

    if (pathname.includes("/list") || url.searchParams.has("path")) {
      const requestedPath = url.searchParams.get("path") || "";
      const prefix = requestedPath.startsWith("/") ? requestedPath.slice(1) : requestedPath;

      const { data: filesList, error } = await supabase.storage
        .from("project-files")
        .list(prefix || undefined, {
          limit: 1000,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        console.error("Error listing files:", error);
        return new Response(JSON.stringify({ files: [] }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        });
      }

      const files = (filesList || []).map((file) => {
        const filePath = prefix ? `/${prefix}/${file.name}` : `/${file.name}`;
        return {
          name: file.name,
          path: filePath,
          isDirectory: file.id === null,
          size: file.metadata?.size || 0,
          modified: file.updated_at || file.created_at,
        };
      });

      return new Response(JSON.stringify({ files }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    if (pathname.includes("/delete") && req.method === "POST") {
      const { files } = await req.json();

      for (const filePath of files) {
        const cleanPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
        try {
          await supabase.storage.from("project-files").remove([cleanPath]);
        } catch (error) {
          console.error(`Error deleting ${filePath}:`, error);
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    if (pathname.includes("/upload") && req.method === "POST") {
      const formData = await req.formData();
      const path = (formData.get("path") as string) || "/";
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      const uploadPath = cleanPath || "";

      const files = formData.getAll("files") as File[];

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const filePath = uploadPath ? `${uploadPath}/${file.name}` : file.name;

        await supabase.storage.from("project-files").upload(filePath, arrayBuffer, {
          contentType: file.type,
          upsert: true,
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    if (pathname.includes("/download")) {
      const filePath = url.searchParams.get("path");
      if (!filePath) {
        return new Response(JSON.stringify({ error: "Path required" }), {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        });
      }

      const cleanPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
      const { data, error } = await supabase.storage
        .from("project-files")
        .download(cleanPath);

      if (error || !data) {
        return new Response(JSON.stringify({ error: "File not found" }), {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        });
      }

      return new Response(data, {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/octet-stream",
        },
      });
    }

    if (pathname.includes("/create-folder") && req.method === "POST") {
      const { path, folderName } = await req.json();
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      const folderPath = cleanPath ? `${cleanPath}/${folderName}/.keep` : `${folderName}/.keep`;

      await supabase.storage.from("project-files").upload(folderPath, new Uint8Array(), {
        contentType: "text/plain",
        upsert: true,
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
