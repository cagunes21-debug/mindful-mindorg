import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, User, Users, Mail, Phone } from "lucide-react";

interface Enrollment {
  id: string;
  start_date: string;
  current_week: number;
  status: string;
  trainer_name: string | null;
  location: string | null;
  group_info: string | null;
}

interface PracticalInfoCardProps {
  enrollment: Enrollment;
}

const PracticalInfoCard = ({ enrollment }: PracticalInfoCardProps) => {
  const startDate = new Date(enrollment.start_date);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7 * 8); // 8 weeks

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Training Info */}
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-lg font-light">Trainingsinformatie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Data</p>
              <p className="text-sm text-muted-foreground">
                {startDate.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })} - {endDate.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          
          {enrollment.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Locatie</p>
                <p className="text-sm text-muted-foreground">{enrollment.location}</p>
              </div>
            </div>
          )}
          
          {enrollment.trainer_name && (
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Trainer</p>
                <p className="text-sm text-muted-foreground">{enrollment.trainer_name}</p>
              </div>
            </div>
          )}
          
          {enrollment.group_info && (
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Groepsinformatie</p>
                <p className="text-sm text-muted-foreground">{enrollment.group_info}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="border-warm-200">
        <CardHeader>
          <CardTitle className="text-lg font-light">Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">E-mail</p>
              <a 
                href="mailto:mindful-mind@outlook.com" 
                className="text-sm text-primary hover:underline"
              >
                mindful-mind@outlook.com
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                Voor vragen over de training of je inschrijving
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Tips voor je training</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Plan elke dag 20-30 minuten voor oefening</li>
              <li>• Luister de meditaties in een rustige ruimte</li>
              <li>• Maak notities van je ervaringen</li>
              <li>• Wees geduldig en mild voor jezelf</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticalInfoCard;
