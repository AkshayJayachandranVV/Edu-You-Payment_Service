export interface IOrder {
    tutorId: string;
    userId: string;
    coursePrice: string;
    adminShare: string;
    tutorShare: string;
    paymentStatus: boolean;
    createdAt: Date; // Ensure this matches the schema
    transactionId: string;
    metadata?: Map<string, string>;
    courseName: string;
    courseId: string;
    thumbnail: string;
    courseCategory: string;
    courseLevel: string;
    courseDiscountPrice: string;
}