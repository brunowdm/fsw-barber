"use client"

import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemProps {
    phone: string
}

const handleCopyClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso!")
}

const PhoneItem = ({phone}: PhoneItemProps) => {
    return (
        <div className="p-5 space-y-3">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <SmartphoneIcon />
                    <p className="text-sm">{phone}</p>
                </div>

                <Button variant="outline" size="sm" onClick={() => handleCopyClick(phone)}>Copiar</Button>
            </div>
        </div>
    );
}

export default PhoneItem;