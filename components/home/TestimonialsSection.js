import { Quote, Star } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SectionReveal from './SectionReveal';
import { testimonials } from './home-data';

export default function TestimonialsSection() {
  return (
    <section className="container py-10">
      <SectionReveal>
        <SectionHeading
          eyebrow="Why it feels different"
          title="Client feedback that matches the new premium direction"
          copy="Real portraits and stronger quote cards help this area feel more trustworthy than the old emoji-driven testimonial slider."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="surface-panel rounded-[30px] p-6">
              <Quote size={28} className="text-primary/25" />
              <p className="mt-4 text-base leading-8 text-stone-700">{testimonial.text}</p>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-stone-900">{testimonial.name}</p>
                  <p className="text-sm text-stone-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
