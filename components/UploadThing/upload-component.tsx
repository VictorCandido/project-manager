"use client";

import Image from 'next/image';
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import { toast } from "sonner";
import { Progress } from "../ui/progress";
import { X } from 'lucide-react';

interface UploadComponentProps {
    value?: string;
    onChange: (value: string) => void;
}

export default function UploadComponent({ value, onChange }: UploadComponentProps) {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    if (isUploading) {
        return <Progress value={progress} className="w-[60%]" />
    }

    if (value) {
        return (
            <div className='relative h-20 w-20'>
                <Image
                    fill
                    src={value}
                    alt='Upload'
                    className='rounded-full'
                />

                <button
                    onClick={() => onChange('')}
                    className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
                    type='button'
                >
                    <X className='h-4 w-4' />
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-between p-24">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                    setIsUploading(false);
                }}
                onUploadError={(error: Error) => {
                    toast.error(`Falha ao fazer upload da imagem: ${error.message}`);
                    console.error('Falha ao fazer upload da imagem:', error);
                }}
                onBeforeUploadBegin={(files) => {
                    setIsUploading(true);
                    return files;
                }}
                onUploadProgress={(progress) => {
                    setProgress(progress);
                }}
            />
        </div>
    );
}