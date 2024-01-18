"use client";

import { CalendarIcon, Plus } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";

import { Button } from "../ui/button";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useFilterAppointment } from "@/hooks/useFilterAppointmentStore";

const AppointmentHeader = () => {
    const [openPopover, setOpenPopover] = useState<boolean>(false);
    const { onOpen } = useModal();
    const { filterDate } = useFilterAppointment.getState();
  
    return (
        <div className="flex justify-end gap-4">
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !filterDate && "text-muted-foreground"
                        )}
                    >
                        {filterDate ? format(filterDate, "PPP", { locale: ptBR }) : <span>Escolha uma data para filtrar</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={filterDate}
                        onSelect={(value) => {
                            useFilterAppointment.getState().setfilterDate(value);
                            setOpenPopover(openPopover => !openPopover);
                        }}
                        locale={ptBR}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            
            <Button onClick={() => onOpen('newAppointment')}>
                <Plus /> Novo Apontamento
            </Button>
        </div>
    );
}
 
export default AppointmentHeader;