
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CountryPhoneInputProps {
  onPhoneChange: (phone: string) => void;
  onCountryChange: (code: string) => void;
  phone: string;
  countryCode: string;
}

// Definición de los países principales y sus prefijos
const MAIN_COUNTRIES = {
  "es": { name: "España", prefix: "+34" },
  "ad": { name: "Andorra", prefix: "+376" },
  "fr": { name: "Francia", prefix: "+33" },
  "de": { name: "Alemania", prefix: "+49" },
  "it": { name: "Italia", prefix: "+39" },
  "gb": { name: "Reino Unido", prefix: "+44" },
  "pt": { name: "Portugal", prefix: "+351" },
  "us": { name: "Estados Unidos", prefix: "+1" },
  "mx": { name: "México", prefix: "+52" },
  "ar": { name: "Argentina", prefix: "+54" },
  "cl": { name: "Chile", prefix: "+56" },
  "co": { name: "Colombia", prefix: "+57" },
  "pe": { name: "Perú", prefix: "+51" },
};

export const CountryPhoneInput = ({
  onPhoneChange,
  onCountryChange,
  phone,
  countryCode,
}: CountryPhoneInputProps) => {
  const [prefix, setPrefix] = useState(MAIN_COUNTRIES[countryCode]?.prefix || "");

  const handleCountryChange = (code: string) => {
    onCountryChange(code);
    setPrefix(MAIN_COUNTRIES[code].prefix);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-sm font-medium mb-1">País*</Label>
        <Select value={countryCode} onValueChange={handleCountryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un país" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(MAIN_COUNTRIES).map(([code, { name }]) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="block text-sm font-medium mb-1">Teléfono</Label>
        <div className="flex gap-2">
          <Input
            className="w-24 flex-none"
            value={prefix}
            disabled
          />
          <Input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="600 000 000"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};
