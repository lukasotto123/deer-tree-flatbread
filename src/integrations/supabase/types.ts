export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      company_assignments: {
        Row: {
          assignment_end_date: string | null
          assignment_start_date: string | null
          company_name: string
          created_at: string | null
          employee_id: string | null
          id: string
          is_active: boolean | null
          provider_id: string | null
          updated_at: string | null
        }
        Insert: {
          assignment_end_date?: string | null
          assignment_start_date?: string | null
          company_name: string
          created_at?: string | null
          employee_id?: string | null
          id?: string
          is_active?: boolean | null
          provider_id?: string | null
          updated_at?: string | null
        }
        Update: {
          assignment_end_date?: string | null
          assignment_start_date?: string | null
          company_name?: string
          created_at?: string | null
          employee_id?: string | null
          id?: string
          is_active?: boolean | null
          provider_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_assignments_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider_document_summary"
            referencedColumns: ["provider_id"]
          },
          {
            foreignKeyName: "company_assignments_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      document_history: {
        Row: {
          action: string
          details: Json | null
          document_id: string | null
          employee_id: string | null
          id: string
          new_status: string | null
          old_status: string | null
          performed_at: string
          performed_by: string | null
          provider_id: string | null
        }
        Insert: {
          action: string
          details?: Json | null
          document_id?: string | null
          employee_id?: string | null
          id?: string
          new_status?: string | null
          old_status?: string | null
          performed_at?: string
          performed_by?: string | null
          provider_id?: string | null
        }
        Update: {
          action?: string
          details?: Json | null
          document_id?: string | null
          employee_id?: string | null
          id?: string
          new_status?: string | null
          old_status?: string | null
          performed_at?: string
          performed_by?: string | null
          provider_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_history_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_history_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider_document_summary"
            referencedColumns: ["provider_id"]
          },
          {
            foreignKeyName: "document_history_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      document_reminders: {
        Row: {
          auto_generated: boolean | null
          created_at: string | null
          days_until_expiry: number | null
          document_id: string | null
          document_status: string | null
          email_sent: boolean | null
          employee_id: string | null
          id: string
          next_reminder_due: string | null
          provider_id: string | null
          reminder_reason: string | null
          reminder_type: string
          sent_at: string
          sms_sent: boolean | null
        }
        Insert: {
          auto_generated?: boolean | null
          created_at?: string | null
          days_until_expiry?: number | null
          document_id?: string | null
          document_status?: string | null
          email_sent?: boolean | null
          employee_id?: string | null
          id?: string
          next_reminder_due?: string | null
          provider_id?: string | null
          reminder_reason?: string | null
          reminder_type: string
          sent_at?: string
          sms_sent?: boolean | null
        }
        Update: {
          auto_generated?: boolean | null
          created_at?: string | null
          days_until_expiry?: number | null
          document_id?: string | null
          document_status?: string | null
          email_sent?: boolean | null
          employee_id?: string | null
          id?: string
          next_reminder_due?: string | null
          provider_id?: string | null
          reminder_reason?: string | null
          reminder_type?: string
          sent_at?: string
          sms_sent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "document_reminders_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_reminders_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_reminders_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider_document_summary"
            referencedColumns: ["provider_id"]
          },
          {
            foreignKeyName: "document_reminders_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      document_types: {
        Row: {
          category: Database["public"]["Enums"]["document_category"]
          category_label: string
          check_frequency_basic: string | null
          check_frequency_secure: string | null
          created_at: string | null
          description: string | null
          id: string
          is_client_specific: boolean | null
          is_per_employee: boolean | null
          issuance_type: string | null
          name: string
          provider_type: Database["public"]["Enums"]["provider_type"]
          required_for_basic: string | null
          required_for_secure: string | null
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["document_category"]
          category_label: string
          check_frequency_basic?: string | null
          check_frequency_secure?: string | null
          created_at?: string | null
          description?: string | null
          id: string
          is_client_specific?: boolean | null
          is_per_employee?: boolean | null
          issuance_type?: string | null
          name: string
          provider_type: Database["public"]["Enums"]["provider_type"]
          required_for_basic?: string | null
          required_for_secure?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["document_category"]
          category_label?: string
          check_frequency_basic?: string | null
          check_frequency_secure?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_client_specific?: boolean | null
          is_per_employee?: boolean | null
          issuance_type?: string | null
          name?: string
          provider_type?: Database["public"]["Enums"]["provider_type"]
          required_for_basic?: string | null
          required_for_secure?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      document_validations: {
        Row: {
          confidence_score: number | null
          document_id: string | null
          id: string
          notes: string | null
          result: string
          validated_at: string
          validated_by: string | null
          validation_details: Json | null
          validation_type: string
        }
        Insert: {
          confidence_score?: number | null
          document_id?: string | null
          id?: string
          notes?: string | null
          result: string
          validated_at?: string
          validated_by?: string | null
          validation_details?: Json | null
          validation_type: string
        }
        Update: {
          confidence_score?: number | null
          document_id?: string | null
          id?: string
          notes?: string | null
          result?: string
          validated_at?: string
          validated_by?: string | null
          validation_details?: Json | null
          validation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_validations_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          basic_check_frequency: string | null
          basic_check_requirement: string | null
          check_frequency: string | null
          created_at: string | null
          employee_id: string | null
          employee_name: string | null
          expiry_date: string | null
          file_url: string | null
          id: string
          is_basic_check_required: boolean | null
          is_client_specific: boolean | null
          is_per_employee: boolean | null
          is_required: boolean | null
          is_secure_check_required: boolean | null
          issuance_type: string | null
          issued_date: string | null
          last_checked: string | null
          name: string
          next_check_due: string | null
          provider: string
          provider_id: string
          provider_type: Database["public"]["Enums"]["provider_type"]
          secure_check_frequency: string | null
          secure_check_requirement: string | null
          status: Database["public"]["Enums"]["document_status"]
          type: string
          updated_at: string | null
        }
        Insert: {
          basic_check_frequency?: string | null
          basic_check_requirement?: string | null
          check_frequency?: string | null
          created_at?: string | null
          employee_id?: string | null
          employee_name?: string | null
          expiry_date?: string | null
          file_url?: string | null
          id: string
          is_basic_check_required?: boolean | null
          is_client_specific?: boolean | null
          is_per_employee?: boolean | null
          is_required?: boolean | null
          is_secure_check_required?: boolean | null
          issuance_type?: string | null
          issued_date?: string | null
          last_checked?: string | null
          name: string
          next_check_due?: string | null
          provider: string
          provider_id: string
          provider_type: Database["public"]["Enums"]["provider_type"]
          secure_check_frequency?: string | null
          secure_check_requirement?: string | null
          status: Database["public"]["Enums"]["document_status"]
          type: string
          updated_at?: string | null
        }
        Update: {
          basic_check_frequency?: string | null
          basic_check_requirement?: string | null
          check_frequency?: string | null
          created_at?: string | null
          employee_id?: string | null
          employee_name?: string | null
          expiry_date?: string | null
          file_url?: string | null
          id?: string
          is_basic_check_required?: boolean | null
          is_client_specific?: boolean | null
          is_per_employee?: boolean | null
          is_required?: boolean | null
          is_secure_check_required?: boolean | null
          issuance_type?: string | null
          issued_date?: string | null
          last_checked?: string | null
          name?: string
          next_check_due?: string | null
          provider?: string
          provider_id?: string
          provider_type?: Database["public"]["Enums"]["provider_type"]
          secure_check_frequency?: string | null
          secure_check_requirement?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider_document_summary"
            referencedColumns: ["provider_id"]
          },
          {
            foreignKeyName: "documents_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "document_types"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          address: string | null
          citizenship: string | null
          created_at: string | null
          date_of_birth: string | null
          documents_required: string[] | null
          email: string | null
          employment_end_date: string | null
          employment_start_date: string | null
          id: string
          name: string
          phone: string | null
          position: string | null
          provider_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          citizenship?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          documents_required?: string[] | null
          email?: string | null
          employment_end_date?: string | null
          employment_start_date?: string | null
          id: string
          name: string
          phone?: string | null
          position?: string | null
          provider_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          citizenship?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          documents_required?: string[] | null
          email?: string | null
          employment_end_date?: string | null
          employment_start_date?: string | null
          id?: string
          name?: string
          phone?: string | null
          position?: string | null
          provider_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "provider_document_summary"
            referencedColumns: ["provider_id"]
          },
          {
            foreignKeyName: "employees_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          address: string | null
          billing_address: string | null
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string | null
          documents_count_expired: number | null
          documents_count_expiring: number | null
          documents_count_missing: number | null
          documents_count_total: number | null
          documents_count_valid: number | null
          id: string
          last_updated: string | null
          managing_director: string | null
          name: string
          status: Database["public"]["Enums"]["provider_status"]
          type: Database["public"]["Enums"]["provider_type"]
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          billing_address?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          documents_count_expired?: number | null
          documents_count_expiring?: number | null
          documents_count_missing?: number | null
          documents_count_total?: number | null
          documents_count_valid?: number | null
          id: string
          last_updated?: string | null
          managing_director?: string | null
          name: string
          status?: Database["public"]["Enums"]["provider_status"]
          type: Database["public"]["Enums"]["provider_type"]
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          billing_address?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          documents_count_expired?: number | null
          documents_count_expiring?: number | null
          documents_count_missing?: number | null
          documents_count_total?: number | null
          documents_count_valid?: number | null
          id?: string
          last_updated?: string | null
          managing_director?: string | null
          name?: string
          status?: Database["public"]["Enums"]["provider_status"]
          type?: Database["public"]["Enums"]["provider_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      provider_document_summary: {
        Row: {
          expired_documents: number | null
          expiring_documents: number | null
          missing_documents: number | null
          provider_id: string | null
          provider_name: string | null
          provider_type: Database["public"]["Enums"]["provider_type"] | null
          reminders_sent: number | null
          total_documents: number | null
          valid_documents: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      auto_create_document_reminders: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      document_category:
        | "kundenspezifisch"
        | "sozial_versicherungsnachweise"
        | "personal_qualifikationsnachweise"
        | "arbeits_mindestlohn_compliance"
        | "behördliche_steuerliche_nachweise"
        | "bonitäts_risikoprüfung"
      document_status: "valid" | "expiring" | "expired" | "missing"
      provider_status: "active" | "pending" | "inactive"
      provider_type: "personaldienstleister" | "nachunternehmer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_category: [
        "kundenspezifisch",
        "sozial_versicherungsnachweise",
        "personal_qualifikationsnachweise",
        "arbeits_mindestlohn_compliance",
        "behördliche_steuerliche_nachweise",
        "bonitäts_risikoprüfung",
      ],
      document_status: ["valid", "expiring", "expired", "missing"],
      provider_status: ["active", "pending", "inactive"],
      provider_type: ["personaldienstleister", "nachunternehmer"],
    },
  },
} as const
