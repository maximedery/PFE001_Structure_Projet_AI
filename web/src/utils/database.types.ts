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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Project: {
        Row: {
          color: string
          id: string
          name: string | null
          workspaceId: string
        }
        Insert: {
          color: string
          id: string
          name?: string | null
          workspaceId: string
        }
        Update: {
          color?: string
          id?: string
          name?: string | null
          workspaceId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Project_workspaceId_fkey"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "Workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      Task: {
        Row: {
          cost: number | null
          end: string | null
          id: string
          importance: Database["public"]["Enums"]["Importance"]
          manHours: number | null
          name: string | null
          projectId: string
          start: string | null
          weatherEffect: Database["public"]["Enums"]["WeatherEffect"]
          workspaceId: string
        }
        Insert: {
          cost?: number | null
          end?: string | null
          id: string
          importance?: Database["public"]["Enums"]["Importance"]
          manHours?: number | null
          name?: string | null
          projectId: string
          start?: string | null
          weatherEffect?: Database["public"]["Enums"]["WeatherEffect"]
          workspaceId: string
        }
        Update: {
          cost?: number | null
          end?: string | null
          id?: string
          importance?: Database["public"]["Enums"]["Importance"]
          manHours?: number | null
          name?: string | null
          projectId?: string
          start?: string | null
          weatherEffect?: Database["public"]["Enums"]["WeatherEffect"]
          workspaceId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Task_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "Project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Task_workspaceId_fkey"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "Workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      TaskHierarchy: {
        Row: {
          predecessorId: string
          successorId: string
        }
        Insert: {
          predecessorId: string
          successorId: string
        }
        Update: {
          predecessorId?: string
          successorId?: string
        }
        Relationships: [
          {
            foreignKeyName: "TaskHierarchy_predecessorId_fkey"
            columns: ["predecessorId"]
            isOneToOne: false
            referencedRelation: "Task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "TaskHierarchy_successorId_fkey"
            columns: ["successorId"]
            isOneToOne: false
            referencedRelation: "Task"
            referencedColumns: ["id"]
          },
        ]
      }
      Workspace: {
        Row: {
          end: string | null
          id: string
          name: string | null
          nbOfEmployees: number | null
          start: string | null
          workingDays: Database["public"]["Enums"]["WorkingDay"][] | null
        }
        Insert: {
          end?: string | null
          id: string
          name?: string | null
          nbOfEmployees?: number | null
          start?: string | null
          workingDays?: Database["public"]["Enums"]["WorkingDay"][] | null
        }
        Update: {
          end?: string | null
          id?: string
          name?: string | null
          nbOfEmployees?: number | null
          start?: string | null
          workingDays?: Database["public"]["Enums"]["WorkingDay"][] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Importance: "asap" | "high" | "medium" | "low"
      WeatherEffect: "none" | "slight" | "significant" | "impossible"
      WorkingDay:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
