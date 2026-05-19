export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  birthday: string; // MM-DD
  notes?: string;
  createdAt: string;
}

export interface SendLog {
  id: string;
  employeeId: string;
  employeeName: string;
  sentAt: string;
  year: number;
  status: "sent" | "failed";
  error?: string;
}

export interface GenerateRequest {
  name: string;
  department: string;
  notes?: string;
}

export interface SendEmailRequest {
  employeeId: string;
  message: string;
}
