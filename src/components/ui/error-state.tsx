import React from 'react';
import { Card } from './card';
import { Button } from './button';
import { ErrorStateProps } from '@/lib/types';

export function ErrorState({ icon, title, message, onRetry }: ErrorStateProps) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="card-galactic p-8 text-center">
                <div className="text-red-400 mb-4">
                    {icon}
                </div>
                <h2 className="text-xl font-semibold text-[#E5E7EB] mb-2">{title}</h2>
                <p className="text-[#94A3B8] mb-4">{message}</p>
                <Button
                    onClick={onRetry}
                    className="bg-[#60A5FA] hover:bg-[#3B82F6] text-[#0B1020]"
                >
                    Try Again
                </Button>
            </Card>
        </div>
    );
}
