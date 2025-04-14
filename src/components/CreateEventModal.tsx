
import React, { useState } from "react";
import { Calendar, Clock, ImageIcon, X, MapPin, Globe, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

// List of popular countries
const countries = [
  { value: "es", label: "España" },
  { value: "ad", label: "Andorra" },
  { value: "ar", label: "Argentina" },
  { value: "au", label: "Australia" },
  { value: "at", label: "Austria" },
  { value: "be", label: "Bélgica" },
  { value: "br", label: "Brasil" },
  { value: "ca", label: "Canadá" },
  { value: "cl", label: "Chile" },
  { value: "cn", label: "China" },
  { value: "co", label: "Colombia" },
  { value: "cr", label: "Costa Rica" },
  { value: "hr", label: "Croacia" },
  { value: "cu", label: "Cuba" },
  { value: "cz", label: "República Checa" },
  { value: "dk", label: "Dinamarca" },
  { value: "do", label: "República Dominicana" },
  { value: "ec", label: "Ecuador" },
  { value: "eg", label: "Egipto" },
  { value: "fi", label: "Finlandia" },
  { value: "fr", label: "Francia" },
  { value: "de", label: "Alemania" },
  { value: "gr", label: "Grecia" },
  { value: "hk", label: "Hong Kong" },
  { value: "hu", label: "Hungría" },
  { value: "is", label: "Islandia" },
  { value: "in", label: "India" },
  { value: "id", label: "Indonesia" },
  { value: "ie", label: "Irlanda" },
  { value: "il", label: "Israel" },
  { value: "it", label: "Italia" },
  { value: "jp", label: "Japón" },
  { value: "kr", label: "Corea del Sur" },
  { value: "lu", label: "Luxemburgo" },
  { value: "my", label: "Malasia" },
  { value: "mx", label: "México" },
  { value: "ma", label: "Marruecos" },
  { value: "nl", label: "Países Bajos" },
  { value: "nz", label: "Nueva Zelanda" },
  { value: "no", label: "Noruega" },
  { value: "pa", label: "Panamá" },
  { value: "pe", label: "Perú" },
  { value: "ph", label: "Filipinas" },
  { value: "pl", label: "Polonia" },
  { value: "pt", label: "Portugal" },
  { value: "ro", label: "Rumanía" },
  { value: "ru", label: "Rusia" },
  { value: "sa", label: "Arabia Saudita" },
  { value: "sg", label: "Singapur" },
  { value: "za", label: "Sudáfrica" },
  { value: "se", label: "Suecia" },
  { value: "ch", label: "Suiza" },
  { value: "tw", label: "Taiwán" },
  { value: "th", label: "Tailandia" },
  { value: "tr", label: "Turquía" },
  { value: "ae", label: "Emiratos Árabes Unidos" },
  { value: "gb", label: "Reino Unido" },
  { value: "us", label: "Estados Unidos" },
  { value: "uy", label: "Uruguay" },
  { value: "ve", label: "Venezuela" },
  { value: "vn", label: "Vietnam" }
];

const eventFormSchema = z.object({
  title: z.string().min(3, { message: "El título debe tener al menos 3 caracteres" }).max(75),
  startDate: z.date({ required_error: "Selecciona una fecha de inicio" }),
  startTime: z.string({ required_error: "Selecciona una hora de inicio" }),
  endDate: z.date().optional(),
  endTime: z.string().optional(),
  description: z.string().optional(),
  eventType: z.enum(["online", "presencial"]),
  location: z.string().optional(),
  eventUrl: z.string().url({ message: "Introduce una URL válida" }).optional().or(z.literal("")),
  organizer: z.string(),
  country: z.string().optional(),
  coverImage: z.any().optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface CreateEventModalProps {
  onEventCreated?: (event: EventFormValues) => void;
  trigger?: React.ReactNode;
}

const CreateEventModal = ({ onEventCreated, trigger }: CreateEventModalProps) => {
  const [open, setOpen] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [openCountrySelect, setOpenCountrySelect] = useState(false);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      eventType: "online",
      organizer: "Carlos Rodríguez",
      description: "",
      location: "",
      eventUrl: "",
      country: "",
    },
  });

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Formato no válido",
          description: "Por favor, sube una imagen en formato JPG, PNG o WebP",
          variant: "destructive",
        });
        return;
      }

      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "El tamaño máximo permitido es 5MB",
          variant: "destructive",
        });
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setCoverImageUrl(imageUrl);
      form.setValue("coverImage", file);
    }
  };

  const onSubmit = (values: EventFormValues) => {
    // Aquí se manejaría la creación real del evento, enviando datos al servidor
    console.log("Nuevo evento:", values);
    toast({
      title: "Evento creado",
      description: "Tu evento se ha creado correctamente",
    });
    onEventCreated?.(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Crear un evento</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Crear un evento</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Imagen de portada */}
            <div>
              <div 
                className="aspect-video bg-gray-100 rounded-md flex flex-col items-center justify-center cursor-pointer relative"
                style={coverImageUrl ? { 
                  backgroundImage: `url(${coverImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } : {}}
              >
                <label htmlFor="cover-image" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  {!coverImageUrl && (
                    <>
                      <ImageIcon className="h-10 w-10 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500 font-medium">Cargar imagen de portada</p>
                      <p className="text-xs text-gray-400 mt-1">Ancho de 480 píxeles como mínimo; relación dimensional de 16:9 recomendada</p>
                    </>
                  )}
                  <input 
                    id="cover-image" 
                    type="file" 
                    className="hidden" 
                    accept="image/jpeg,image/png,image/webp" 
                    onChange={handleCoverImageChange}
                  />
                </label>
                {coverImageUrl && (
                  <button 
                    type="button"
                    className="absolute top-2 right-2 bg-gray-800/70 text-white p-1 rounded-full hover:bg-gray-800"
                    onClick={() => {
                      setCoverImageUrl(null);
                      form.setValue("coverImage", undefined);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Título */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del evento*</FormLabel>
                  <FormControl>
                    <Input placeholder="Titulo del evento" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="text-xs text-right text-muted-foreground">
                    {field.value.length}/75
                  </div>
                </FormItem>
              )}
            />

            {/* Organizador */}
            <FormField
              control={form.control}
              name="organizer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizador*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de evento */}
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de evento</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="online" />
                        <label htmlFor="online" className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          Online
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="presencial" id="presencial" />
                        <label htmlFor="presencial" className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          En persona
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha y hora de inicio */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de inicio*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PP", { locale: es })
                            ) : (
                              <span>Seleccionar fecha</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarPicker
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de inicio*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="time" {...field} />
                        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Fecha y hora de finalización */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de finalización</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PP", { locale: es })
                            ) : (
                              <span>Seleccionar fecha</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarPicker
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) => 
                            date < (form.getValues("startDate") || new Date())
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de finalización</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="time" {...field} />
                        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* País */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>País</FormLabel>
                  <Popover open={openCountrySelect} onOpenChange={setOpenCountrySelect}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCountrySelect}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? countries.find((country) => country.value === field.value)?.label
                            : "Seleccionar país"}
                          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar país..."
                          className="h-9"
                        />
                        <CommandEmpty>No se encontraron países</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {countries.map((country) => (
                            <CommandItem
                              key={country.value}
                              value={country.label}
                              onSelect={() => {
                                form.setValue("country", country.value);
                                setOpenCountrySelect(false);
                              }}
                            >
                              {country.label}
                              {country.value === field.value && (
                                <span className="ml-auto">✓</span>
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descripción */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Por ejemplo: temas, horario, etc." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campos específicos según el tipo de evento */}
            {form.watch("eventType") === "presencial" ? (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación</FormLabel>
                    <FormControl>
                      <Input placeholder="Dirección completa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="eventUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL del evento</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="pt-4 flex justify-end">
              <Button type="submit">Crear evento</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
