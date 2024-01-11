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

const AppointmentCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Francal</CardTitle>
                <CardDescription>08:30 - 16:00</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat</p>
            </CardContent>
            <CardFooter>
                <div className="flex gap-4 justify-end w-full">
                <Button className="gap-2">
                <Pen /> Editar
                </Button>

                <Button className="gap-2" variant="destructive">
                <Trash2 /> Remover
                </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
 
export default AppointmentCard;