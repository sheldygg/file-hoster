import {getFile} from "@/app/api/file";

export async function GET(request: Request) {
    const fileId = new URL(request.url).pathname.substring(1);

    const fileResponse = await getFile(fileId);

    if (fileResponse.ok && fileResponse.file && fileResponse.mimeType) {
        return new Response(
            fileResponse.file,
            {
                headers: {
                    "Content-Type": fileResponse.mimeType,
                    "Content-Length": fileResponse.file.length.toString()
                }
            }
        )
    }

    return new Response("Undefined")
}