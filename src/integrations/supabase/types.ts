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
      client_sessions: {
        Row: {
          client_id: string
          created_at: string
          date: string
          duration_overrides: Json | null
          generated_plan_markdown: string | null
          id: string
          msc_session_id: string
          selected_item_ids: string[] | null
          target_duration_minutes: number
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          date?: string
          duration_overrides?: Json | null
          generated_plan_markdown?: string | null
          id?: string
          msc_session_id: string
          selected_item_ids?: string[] | null
          target_duration_minutes?: number
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          date?: string
          duration_overrides?: Json | null
          generated_plan_markdown?: string | null
          id?: string
          msc_session_id?: string
          selected_item_ids?: string[] | null
          target_duration_minutes?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_sessions_msc_session_id_fkey"
            columns: ["msc_session_id"]
            isOneToOne: false
            referencedRelation: "msc_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
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
          client_id: string | null
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
          sessions_remaining: number | null
          sessions_total: number | null
          sessions_used: number
          start_date: string
          status: Database["public"]["Enums"]["enrollment_status"] | null
          trainer_name: string | null
          training_id: string | null
          unlocked_weeks: number[]
          updated_at: string
          user_id: string | null
          visible_sections: string[]
        }
        Insert: {
          client_id?: string | null
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
          sessions_remaining?: number | null
          sessions_total?: number | null
          sessions_used?: number
          start_date: string
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          trainer_name?: string | null
          training_id?: string | null
          unlocked_weeks?: number[]
          updated_at?: string
          user_id?: string | null
          visible_sections?: string[]
        }
        Update: {
          client_id?: string | null
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
          sessions_remaining?: number | null
          sessions_total?: number | null
          sessions_used?: number
          start_date?: string
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          trainer_name?: string | null
          training_id?: string | null
          unlocked_weeks?: number[]
          updated_at?: string
          user_id?: string | null
          visible_sections?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "trainings"
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
      leads: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          interest: string | null
          last_name: string
          message: string | null
          notes: string | null
          phone_number: string | null
          status: string
          submission_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          interest?: string | null
          last_name?: string
          message?: string | null
          notes?: string | null
          phone_number?: string | null
          status?: string
          submission_date?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          interest?: string | null
          last_name?: string
          message?: string | null
          notes?: string | null
          phone_number?: string | null
          status?: string
          submission_date?: string
          updated_at?: string
        }
        Relationships: []
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
      msc_items: {
        Row: {
          created_at: string
          duration_minutes: number
          id: string
          instructions_markdown: string | null
          is_optional: boolean
          notes_for_therapist: string | null
          session_id: string
          sort_order: number
          tags: string[] | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          duration_minutes?: number
          id?: string
          instructions_markdown?: string | null
          is_optional?: boolean
          notes_for_therapist?: string | null
          session_id: string
          sort_order?: number
          tags?: string[] | null
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          duration_minutes?: number
          id?: string
          instructions_markdown?: string | null
          is_optional?: boolean
          notes_for_therapist?: string | null
          session_id?: string
          sort_order?: number
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "msc_items_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "msc_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      msc_sessions: {
        Row: {
          created_at: string
          default_duration_minutes: number
          description: string | null
          id: string
          title: string
          updated_at: string
          week_number: number
        }
        Insert: {
          created_at?: string
          default_duration_minutes?: number
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          week_number: number
        }
        Update: {
          created_at?: string
          default_duration_minutes?: number
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: []
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
      order_items: {
        Row: {
          created_at: string
          description: string
          id: string
          order_id: string
          quantity: number
          registration_id: string | null
          total: number
          training_id: string | null
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          order_id: string
          quantity?: number
          registration_id?: string | null
          total?: number
          training_id?: string | null
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          order_id?: string
          quantity?: number
          registration_id?: string | null
          total?: number
          training_id?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          client_id: string | null
          created_at: string
          discount: number
          id: string
          notes: string | null
          order_number: string
          status: string
          subtotal: number
          total: number
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          discount?: number
          id?: string
          notes?: string | null
          order_number?: string
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          discount?: number
          id?: string
          notes?: string | null
          order_number?: string
          status?: string
          subtotal?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
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
      password_reset_otps: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          otp_code: string
          used: boolean
        }
        Insert: {
          created_at?: string
          email: string
          expires_at: string
          id?: string
          otp_code: string
          used?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          otp_code?: string
          used?: boolean
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          method: string
          notes: string | null
          order_id: string
          paid_at: string | null
          status: string
          stripe_payment_id: string | null
          updated_at: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          method?: string
          notes?: string | null
          order_id: string
          paid_at?: string | null
          status?: string
          stripe_payment_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          method?: string
          notes?: string | null
          order_id?: string
          paid_at?: string | null
          status?: string
          stripe_payment_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
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
      therapy_sessions: {
        Row: {
          achtergrond: string | null
          belangrijkste_themas: string | null
          created_at: string
          doelstelling: string | null
          enrollment_id: string
          helpvraag: string | null
          id: string
          interventies: string | null
          observaties: string | null
          session_date: string | null
          session_number: number | null
          transcript: string
          updated_at: string
        }
        Insert: {
          achtergrond?: string | null
          belangrijkste_themas?: string | null
          created_at?: string
          doelstelling?: string | null
          enrollment_id: string
          helpvraag?: string | null
          id?: string
          interventies?: string | null
          observaties?: string | null
          session_date?: string | null
          session_number?: number | null
          transcript?: string
          updated_at?: string
        }
        Update: {
          achtergrond?: string | null
          belangrijkste_themas?: string | null
          created_at?: string
          doelstelling?: string | null
          enrollment_id?: string
          helpvraag?: string | null
          id?: string
          interventies?: string | null
          observaties?: string | null
          session_date?: string | null
          session_number?: number | null
          transcript?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapy_sessions_enrollment_id_fkey"
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
      training_content_items: {
        Row: {
          content_type: string
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          is_visible: boolean
          order_index: number
          release_date: string | null
          text_content: string | null
          title: string
          training_type: string
          unit_number: number
          updated_at: string
        }
        Insert: {
          content_type?: string
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          is_visible?: boolean
          order_index?: number
          release_date?: string | null
          text_content?: string | null
          title: string
          training_type: string
          unit_number: number
          updated_at?: string
        }
        Update: {
          content_type?: string
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          is_visible?: boolean
          order_index?: number
          release_date?: string | null
          text_content?: string | null
          title?: string
          training_type?: string
          unit_number?: number
          updated_at?: string
        }
        Relationships: []
      }
      training_welcome_content: {
        Row: {
          created_at: string
          id: string
          intro_video_url: string | null
          training_type: string
          updated_at: string
          welcome_message: string
          welcome_title: string
        }
        Insert: {
          created_at?: string
          id?: string
          intro_video_url?: string | null
          training_type: string
          updated_at?: string
          welcome_message?: string
          welcome_title?: string
        }
        Update: {
          created_at?: string
          id?: string
          intro_video_url?: string | null
          training_type?: string
          updated_at?: string
          welcome_message?: string
          welcome_title?: string
        }
        Relationships: []
      }
      trainings: {
        Row: {
          created_at: string
          description: string | null
          duration_weeks: number | null
          id: string
          is_active: boolean
          name: string
          price: number | null
          sessions: number
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_weeks?: number | null
          id?: string
          is_active?: boolean
          name: string
          price?: number | null
          sessions?: number
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_weeks?: number | null
          id?: string
          is_active?: boolean
          name?: string
          price?: number | null
          sessions?: number
          type?: string
          updated_at?: string
        }
        Relationships: []
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
      link_user_to_client: {
        Args: { _email: string; _user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      enrollment_status:
        | "active"
        | "completed"
        | "paused"
        | "cancelled"
        | "invited"
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
      enrollment_status: [
        "active",
        "completed",
        "paused",
        "cancelled",
        "invited",
      ],
    },
  },
} as const
