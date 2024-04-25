"use client";
import {useState} from "react";
import {Title} from "@/app/components/title";
import {ErrorMessage} from "@/app/components/error";
import {putFile} from "@/app/api/file";


export default function Home() {
    const [error, setError] = useState("");
    const onSubmit = async (file: File) => {
        try {
            setError("");
            const fileId = await putFile(
                file.stream(),
                {mime_type: file.type}
            );
            const url = new URL(window.location.href);
            url.pathname = `/${fileId}`
            window.location.href = url.toString()

        } catch (e) {
            console.error(e);
            setError((e as Error).message);
        }
    };
    const handleFile = (file: File) => {
        if (file.size > 10 * 1024 * 1024) {
            setError("File size is too large. Max 10MB");
            return;
        }
        onSubmit(file);
    }

    return (
        <div className="container px-8 mx-auto mt-16 lg:mt-32 ">
            {error ? <ErrorMessage message={error}/> : null}
            <form className="max-w-3xl mx-auto">
                <div className="text-center">
                    <Title>Host your file</Title>
                    <div className="mt-8">
                        <ul className="space-y-2 text-xs text-zinc-500">
                            <li>
                                <p>
                                    <span className="font-semibold text-zinc-400">Size limit:</span> 10 MB
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="font-semibold text-zinc-400">TTL:</span> File will available 7
                                    days. After that time file will be deleted.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full gap-4 mt-4 sm:flex-row">
                    <div className="w-full sm:w-1/5">
                        <label
                            className="flex items-center justify-center h-16 px-3 py-2 text-sm whitespace-no-wrap duration-150 border rounded hover:border-zinc-100/80 border-zinc-600 focus:border-zinc-100/80 focus:ring-0 text-zinc-100 hover:text-white hover:cursor-pointer "
                            htmlFor="file_input"
                        >
                            Upload a file
                        </label>
                        <input
                            className="hidden"
                            id="file_input"
                            type="file"
                            onChange={(e) => {
                                const selectedFile = e.target.files![0];
                                handleFile(selectedFile)
                            }}
                        />
                    </div>

                </div>
            </form>
        </div>
    );
}