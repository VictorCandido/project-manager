"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { Pen, Trash2 } from "lucide-react";
import { AppointmentCustomerProps } from "@/types/AppointmentCustomerProps";
import { useModal } from "@/hooks/useModalStore";

interface AppointmentCardProps {
    data: AppointmentCustomerProps;
}

const AppointmentCard = ({ data }: AppointmentCardProps) => {
    const { onOpen } = useModal();

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>{data.customer.name}</CardTitle>
                <CardDescription>{data.start} - {data.end}</CardDescription>
            </CardHeader>
            <CardContent className="whitespace-pre-wrap">
                {data.description}
            </CardContent>
            <CardFooter>
                <div className="flex gap-4 justify-end w-full">
                    <Button 
                        className="gap-2"
                        onClick={() => onOpen('editAppointment', { appointmentData: data })}
                    >
                        <Pen /> Editar
                    </Button>

                    <Button 
                        className="gap-2" 
                        variant="destructive"
                        onClick={() => onOpen('deleteAppointment', { appointmentData: data })}
                    >
                        <Trash2 /> Remover
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
 
export default AppointmentCard;