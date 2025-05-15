import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";
import type { Day } from "date-fns";
import { Calendar as LucideCalendar } from "lucide-react";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "./popover"; // adjust import path if needed
import { cn } from "../../../../lib/utils";

interface MyDatePickerWithLabelProps {
    label: string;
    selected?: Date;
    onSelect: (date: Date | undefined) => void;
}

// Fix for Sunday start
const frSunday = {
    ...fr,
    options: {
        ...fr.options,
        weekStartsOn: 0 as Day,
    },
};

export function MyDatePickerWithLabel({
    label,
    selected,
    onSelect,
}: MyDatePickerWithLabelProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-1 z-[100]">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            "w-full bg-gray-100 text-left py-2 px-3 rounded border text-sm flex items-center justify-between"
                        )}
                    >
                        <span>
                            {selected
                                ? selected.toLocaleDateString("fr-FR")
                                : "Choisir une date"}
                        </span>
                        <LucideCalendar className="h-4 w-4 text-gray-500" />
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    sideOffset={4}
                    className="bg-white border rounded-md shadow-md p-2 z-[999] w-auto"
                >
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={(date) => {
                            onSelect(date);
                            setIsOpen(false);
                        }}
                        locale={frSunday}
                        modifiersClassNames={{
                            selected: "bg-blue-600 text-white",
                            today: "bg-gray-100",
                            disabled: "text-gray-400 opacity-50",
                        }}
                        styles={{
                            caption: { fontSize: "0.8rem", fontWeight: "bold" },
                            month: { width: "230px", margin: "0 auto" },
                            day: {
                                height: "30px",
                                width: "30px",
                                fontSize: "0.75rem",
                            },
                            nav: { justifyContent: "space-between" },
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
