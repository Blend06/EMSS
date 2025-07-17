import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MapComponent = () => {
  return (
    <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-medium">
      <iframe 
        style={{ border: 0, width: '100%', height: '100%' }} 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.252848833522!2d21.14850531550427!3d42.66285817915752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549f6a3e1b3e1b%3A0x5e8a8e55b9a8a1e2!2sPrishtina!5e0!3m2!1sen!2sus!4v1676962216455!5m2!1sen!2sus" 
        frameBorder="0" 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Pristina, Kosovo Location"
      />
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-soft">
        <h3 className="font-semibold text-sm mb-1">📍 Find Us Here</h3>
        <p className="text-xs text-muted-foreground">Pristina, Kosovo</p>
      </div>
    </div>
  );
};

export default MapComponent;