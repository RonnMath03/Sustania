import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KnowledgeBase } from './knowledge-base';
import { FaqSection } from './faq-section';
import { ContactForm } from './contact-form';
import { TutorialSection } from './tutorial-section';
import { Book, HelpCircle, Mail, Video } from 'lucide-react';

export function SupportView() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Help & Support</h2>
      </div>

      <Tabs defaultValue="knowledge-base" className="space-y-4">
        <TabsList>
          <TabsTrigger value="knowledge-base">
            <Book className="mr-2 h-4 w-4" />
            Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="faq">
            <HelpCircle className="mr-2 h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <Video className="mr-2 h-4 w-4" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="knowledge-base">
          <KnowledgeBase />
        </TabsContent>

        <TabsContent value="faq">
          <FaqSection />
        </TabsContent>

        <TabsContent value="tutorials">
          <TutorialSection />
        </TabsContent>

        <TabsContent value="contact">
          <ContactForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}