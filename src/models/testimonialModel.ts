import mongoose, { Document, Model } from "mongoose";

// Define the Testimonial schema interface
export interface ITestimonial extends Document {
  studentName: string;
  rank: string;
  examName: string;
  testimonial: string;
  image: Buffer; // URL or path for student image
}

// Define the schema using the ITestimonial interface
const testimonialSchema = new mongoose.Schema<ITestimonial>(
  {
    studentName: { type: String, required: true },
    rank: { type: String, required: true },
    examName: { type: String, required: true },
    testimonial: { type: String, required: true },
    image: { type: Buffer, required: true }, // URL or path of the student image (jpeg, jpg, png)
  },
  { timestamps: true }
);

// Ensure the Testimonial model has proper types with mongoose.Model
const TestimonialModel: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", testimonialSchema);

export default TestimonialModel;
