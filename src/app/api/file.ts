import {getObjectStorage} from "@/app/api/nats";

export interface FileResponse {
    ok: boolean
    file?: Uint8Array
    mimeType?: string
}


export async function getFile(file_id: string): Promise<FileResponse> {
    const bucket = await getObjectStorage();
    const objectResult = await bucket.get(file_id);
    if (objectResult && objectResult.info.metadata) {
        const file = await objectResult.data.getReader().read()
        if (file.value) {
            return {ok: true, file: file.value, mimeType: objectResult.info.metadata.mime_type}
        }
    }
    return {ok: false}
}

function generateSafeCode(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    let safeCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        safeCode += charset[randomIndex];
    }
    return safeCode;
}

export async function putFile(file: ReadableStream<Uint8Array>, metadata: Record<string, string>): Promise<string> {
    const bucket = await getObjectStorage();

    const file_id = generateSafeCode(5);
    await bucket.put(
        {name: file_id, metadata: metadata},
        file,
    )
    return file_id;

}