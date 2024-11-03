import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const faqCategories = [
  {
    title: 'General Questions',
    description: 'Basic information about the platform',
    items: [
      {
        question: 'What is Sustania?',
        answer: 'Sustania is a digital farming platform that helps farmers optimize their irrigation and crop management through smart technology and data-driven insights.',
      },
      {
        question: 'How do I get started?',
        answer: 'After registration, you can set up your farm profile, configure irrigation zones, and start monitoring your crops. Our quick start guide provides step-by-step instructions.',
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes, we use industry-standard encryption and security measures to protect your data. We never share your information without your explicit consent.',
      },
    ],
  },
  {
    title: 'Technical Support',
    description: 'Help with technical issues',
    items: [
      {
        question: 'How do I reset my password?',
        answer: 'Click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your inbox.',
      },
      {
        question: 'What browsers are supported?',
        answer: 'Sustania works best with modern browsers like Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version.',
      },
      {
        question: 'How do I update my system?',
        answer: 'The platform updates automatically. You\'ll be notified of any major updates that require your attention.',
      },
    ],
  },
  {
    title: 'Billing & Subscription',
    description: 'Information about pricing and billing',
    items: [
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.',
      },
      {
        question: 'Can I upgrade my plan?',
        answer: 'Yes, you can upgrade your plan at any time. The price difference will be prorated for the remaining subscription period.',
      },
      {
        question: 'What\'s your refund policy?',
        answer: 'We offer a 30-day money-back guarantee for all new subscriptions. Contact our support team for refund requests.',
      },
    ],
  },
];

export function FaqSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search frequently asked questions..." 
          className="max-w-[300px]"
        />
      </div>

      <div className="grid gap-4">
        {faqCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}