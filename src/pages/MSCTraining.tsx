import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Brain, Users, Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";

const MSCTraining = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-50 via-background to-warm-50 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--sage-200))_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--warm-100))_0%,transparent_50%)]" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-sage-700">
              Transform Your Relationship with Yourself
            </span>
            <h1 className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Mindful Self-Compassion
              <span className="block font-serif italic text-sage-600">Training Program</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Learn evidence-based practices to cultivate inner kindness, emotional resilience, 
              and a deeper connection with yourself through our 8-week MSC course.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-white">
                Enroll Now
              </Button>
              <Button size="lg" variant="outline" className="border-sage-300 text-sage-700 hover:bg-sage-50">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is MSC Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl">
              What is <span className="font-serif italic text-sage-600">Mindful Self-Compassion?</span>
            </h2>
            <p className="mb-12 text-muted-foreground">
              Developed by Dr. Kristin Neff and Dr. Christopher Germer, MSC is an empirically-supported 
              program designed to cultivate the skill of self-compassion. Research shows that self-compassion 
              is strongly associated with emotional wellbeing, reduced anxiety and depression, and greater life satisfaction.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-sage-100 bg-gradient-to-b from-sage-50/50 to-transparent transition-all hover:shadow-soft">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-100">
                  <Heart className="h-7 w-7 text-sage-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium text-foreground">Self-Kindness</h3>
                <p className="text-sm text-muted-foreground">
                  Being warm and understanding toward ourselves when we suffer, fail, or feel inadequate.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-sage-100 bg-gradient-to-b from-warm-50/50 to-transparent transition-all hover:shadow-soft">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warm-100">
                  <Users className="h-7 w-7 text-warm-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium text-foreground">Common Humanity</h3>
                <p className="text-sm text-muted-foreground">
                  Recognizing that suffering and personal inadequacy are part of the shared human experience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-sage-100 bg-gradient-to-b from-sage-50/50 to-transparent transition-all hover:shadow-soft">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-100">
                  <Brain className="h-7 w-7 text-sage-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium text-foreground">Mindfulness</h3>
                <p className="text-sm text-muted-foreground">
                  Holding our experience in balanced awareness rather than over-identifying with painful feelings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-sage-50/50 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl">
              Benefits of <span className="font-serif italic text-sage-600">Self-Compassion</span>
            </h2>
            <p className="mb-12 text-muted-foreground">
              Research has demonstrated numerous benefits of practicing self-compassion
            </p>
          </div>
          
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {[
              "Reduced anxiety and depression",
              "Greater emotional resilience",
              "Improved relationships",
              "Enhanced motivation and growth",
              "Better physical health outcomes",
              "Increased life satisfaction",
              "Reduced stress and burnout",
              "Greater sense of wellbeing"
            ].map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-soft"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-sage-500" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-foreground md:text-4xl">
              Course <span className="font-serif italic text-sage-600">Details</span>
            </h2>
            <p className="mb-12 text-muted-foreground">
              Our 8-week program provides a supportive environment for learning and practice
            </p>
          </div>
          
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <Card className="border-sage-100 overflow-hidden">
              <div className="bg-sage-600 px-6 py-4">
                <h3 className="text-xl font-medium text-white">Program Structure</h3>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage-500" />
                    <div>
                      <span className="font-medium text-foreground">8 Weekly Sessions</span>
                      <p className="text-sm text-muted-foreground">Progressive learning journey</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage-500" />
                    <div>
                      <span className="font-medium text-foreground">2.5 Hours Each</span>
                      <p className="text-sm text-muted-foreground">Deep, immersive sessions</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Leaf className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage-500" />
                    <div>
                      <span className="font-medium text-foreground">Half-Day Retreat</span>
                      <p className="text-sm text-muted-foreground">Silent practice experience</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage-500" />
                    <div>
                      <span className="font-medium text-foreground">In-Person & Online</span>
                      <p className="text-sm text-muted-foreground">Flexible attendance options</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-warm-100 overflow-hidden">
              <div className="bg-warm-600 px-6 py-4">
                <h3 className="text-xl font-medium text-white">What You'll Learn</h3>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {[
                    "Core meditation practices",
                    "Informal self-compassion exercises",
                    "Working with difficult emotions",
                    "Transforming self-criticism",
                    "Managing caregiver fatigue",
                    "Self-compassion in relationships"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-warm-400" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-sage-600 to-sage-700 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-light text-white md:text-4xl">
              Begin Your Journey to
              <span className="block font-serif italic">Self-Compassion</span>
            </h2>
            <p className="mb-8 text-sage-100">
              Join our next cohort and discover the transformative power of treating yourself 
              with the same kindness you would offer a good friend.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-white text-sage-700 hover:bg-sage-50">
                Register for Next Course
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Download Syllabus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sage-100 bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mindful Mind. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MSCTraining;
