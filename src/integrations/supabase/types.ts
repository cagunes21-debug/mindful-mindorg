export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      assignments: {
        Row: {
          created_at: string
          description: string | null
          id: string
          instructions: string | null
          sort_order: number | null
          title: string
          week_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          instructions?: string | null
          sort_order?: number | null
          title: string
          week_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          instructions?: string | null
          sort_order?: number | null
          title?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "course_weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_name: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          category?: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      course_weeks: {
        Row: {
          content: Json | null
          course_type: string
          created_at: string
          description: string | null
          id: string
          notebook_audio_url: string | null
          notebook_url: string | null
          presentation_url: string | null
          theme: string | null
          title: string
          updated_at: string
          week_number: number
        }
        Insert: {
          content?: Json | null
          course_type?: string
          created_at?: string
          description?: string | null
          id?: string
          notebook_audio_url?: string | null
          notebook_url?: string | null
          presentation_url?: string | null
          theme?: string | null
          title: string
          updated_at?: string
          week_number: number
        }
        Update: {
          content?: Json | null
          course_type?: string
          created_at?: string
          description?: string | null
          id?: string
          notebook_audio_url?: string | null
          notebook_url?: string | null
          presentation_url?: string | null
          theme?: string | null
          title?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          course_type: string
          created_at: string
          current_week: number | null
          group_info: string | null
          id: string
          intake_goal: string | null
          intake_reason: string | null
          intake_theme: string | null
          location: string | null
          registration_id: string | null
          start_date: string
          status: Database["public"]["Enums"]["enrollment_status"] | null
          trainer_name: string | null
          unlocked_weeks: number[]
          updated_at: string
          user_id: string
          visible_sections: string[]
        }
        Insert: {
          course_type?: string
          created_at?: string
          current_week?: number | null
          group_info?: string | null
          id?: string
          intake_goal?: string | null
          intake_reason?: string | null
          intake_theme?: string | null
          location?: string | null
          registration_id?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          trainer_name?: string | null
          unlocked_weeks?: number[]
          updated_at?: string
          user_id: string
          visible_sections?: string[]
        }
        Update: {
          course_type?: string
          created_at?: string
          current_week?: number | null
          group_info?: string | null
          id?: string
          intake_goal?: string | null
          intake_reason?: string | null
          intake_theme?: string | null
          location?: string | null
          registration_id?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          trainer_name?: string | null
          unlocked_weeks?: number[]
          updated_at?: string
          user_id?: string
          visible_sections?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_submissions: {
        Row: {
          additional_notes: string | null
          availability: string | null
          emergency_contact: string | null
          enrollment_id: string
          expectations: string | null
          goal: string | null
          health_situation: string | null
          id: string
          main_theme: string | null
          mindfulness_experience: string | null
          reason: string | null
          submitted_at: string
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          availability?: string | null
          emergency_contact?: string | null
          enrollment_id: string
          expectations?: string | null
          goal?: string | null
          health_situation?: string | null
          id?: string
          main_theme?: string | null
          mindfulness_experience?: string | null
          reason?: string | null
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          availability?: string | null
          emergency_contact?: string | null
          enrollment_id?: string
          expectations?: string | null
          goal?: string | null
          health_situation?: string | null
          id?: string
          main_theme?: string | null
          mindfulness_experience?: string | null
          reason?: string | null
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "intake_submissions_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      meditations: {
        Row: {
          audio_url: string
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          sort_order: number | null
          title: string
          week_id: string
        }
        Insert: {
          audio_url: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          sort_order?: number | null
          title: string
          week_id: string
        }
        Update: {
          audio_url?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          sort_order?: number | null
          title?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meditations_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "course_weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          status: string
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      participant_progress: {
        Row: {
          assignment_id: string | null
          completed_at: string | null
          enrollment_id: string
          id: string
          meditation_id: string | null
          notes: string | null
          user_id: string
          week_id: string
        }
        Insert: {
          assignment_id?: string | null
          completed_at?: string | null
          enrollment_id: string
          id?: string
          meditation_id?: string | null
          notes?: string | null
          user_id: string
          week_id: string
        }
        Update: {
          assignment_id?: string | null
          completed_at?: string | null
          enrollment_id?: string
          id?: string
          meditation_id?: string | null
          notes?: string | null
          user_id?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_progress_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_progress_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_progress_meditation_id_fkey"
            columns: ["meditation_id"]
            isOneToOne: false
            referencedRelation: "meditations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_progress_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "course_weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          admin_notes: string | null
          created_at: string
          email: string
          id: string
          name: string
          paid_at: string | null
          payment_link: string | null
          payment_status: string | null
          phone: string | null
          price: string | null
          remarks: string | null
          status: string
          stripe_session_id: string | null
          tags: string[] | null
          training_date: string | null
          training_name: string
          training_time: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          paid_at?: string | null
          payment_link?: string | null
          payment_status?: string | null
          phone?: string | null
          price?: string | null
          remarks?: string | null
          status?: string
          stripe_session_id?: string | null
          tags?: string[] | null
          training_date?: string | null
          training_name: string
          training_time?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          paid_at?: string | null
          payment_link?: string | null
          payment_status?: string | null
          phone?: string | null
          price?: string | null
          remarks?: string | null
          status?: string
          stripe_session_id?: string | null
          tags?: string[] | null
          training_date?: string | null
          training_name?: string
          training_time?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      scs_submissions: {
        Row: {
          answers: Json
          common_humanity: number | null
          enrollment_id: string
          id: string
          isolation: number | null
          measurement_type: string
          mindfulness: number | null
          over_identification: number | null
          overall_score: number | null
          self_judgment: number | null
          self_kindness: number | null
          submitted_at: string
          updated_at: string
        }
        Insert: {
          answers?: Json
          common_humanity?: number | null
          enrollment_id: string
          id?: string
          isolation?: number | null
          measurement_type?: string
          mindfulness?: number | null
          over_identification?: number | null
          overall_score?: number | null
          self_judgment?: number | null
          self_kindness?: number | null
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          answers?: Json
          common_humanity?: number | null
          enrollment_id?: string
          id?: string
          isolation?: number | null
          measurement_type?: string
          mindfulness?: number | null
          over_identification?: number | null
          overall_score?: number | null
          self_judgment?: number | null
          self_kindness?: number | null
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scs_submissions_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      session_appointments: {
        Row: {
          created_at: string
          enrollment_id: string
          id: string
          notes: string | null
          session_date: string | null
          session_time: string | null
          status: string
          updated_at: string
          week_number: number
        }
        Insert: {
          created_at?: string
          enrollment_id: string
          id?: string
          notes?: string | null
          session_date?: string | null
          session_time?: string | null
          status?: string
          updated_at?: string
          week_number: number
        }
        Update: {
          created_at?: string
          enrollment_id?: string
          id?: string
          notes?: string | null
          session_date?: string | null
          session_time?: string | null
          status?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "session_appointments_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_notes: {
        Row: {
          content: string
          created_at: string
          enrollment_id: string
          id: string
          note_type: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          enrollment_id: string
          id?: string
          note_type?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          enrollment_id?: string
          id?: string
          note_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trainer_notes_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      customers: {
        Row: {
          email: string | null
          first_registration: string | null
          last_registration: string | null
          name: string | null
          paid_registrations: number | null
          phone: string | null
          total_registrations: number | null
          total_spent: number | null
          trainings: string[] | null
        }
        Relationships: []
      }
    }
    Functions: {
      enrollment_exists: { Args: { _enrollment_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      enrollment_status: "active" | "completed" | "paused" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      enrollment_status: ["active", "completed", "paused", "cancelled"],
    },
  },
} as const
