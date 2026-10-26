/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConfidentialitySeal } from './components/ConfidentialitySeal';
import { GuidanceAreas } from './components/GuidanceAreas';
import { AssessmentAkuPintar } from './components/AssessmentAkuPintar';
import { BookingSection } from './components/BookingSection';
import { StudentVoices } from './components/StudentVoices';
import { ReflectionJournal } from './components/ReflectionJournal';
import { CareerCompass } from './components/CareerCompass';
import { RplDocumentation } from './components/RplDocumentation';
import { CounselorProfile } from './components/CounselorProfile';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Footer } from './components/Footer';
import { INITIAL_SCHEDULED_SESSIONS } from './data/bkData';
import { ScheduledSession, GuidanceArea } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [scheduledSessions, setScheduledSessions] = useState<ScheduledSession[]>(INITIAL_SCHEDULED_SESSIONS);
  const [preselectedArea, setPreselectedArea] = useState<GuidanceArea>('karir');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    scrollToSection('jadwal');
  };

  const handleSelectAreaForBooking = (area: GuidanceArea) => {
    setPreselectedArea(area);
    scrollToSection('jadwal');
  };

  const handleAddSession = (newSession: ScheduledSession) => {
    setScheduledSessions([newSession, ...scheduledSessions]);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f3] text-[#1A2821] flex flex-col selection:bg-[#c5e9ca] selection:text-[#163328] relative">
      {/* Strict Top Bar Contract */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1">
        {/* Hero Section: Split-Screen Hero + Real Photo + WhatsApp Hotline + 4-Column KPI strip */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onExplorePrograms={() => scrollToSection('layanan')}
          onViewRpl={() => scrollToSection('rpl')}
          onExploreAssessment={() => scrollToSection('asesmen')}
        />

        {/* Confidentiality Seal Notice Banner (Kode Etik ABKIN & Permendikbud No. 111/2014) */}
        <ConfidentialitySeal />

        {/* 4 Bidang Layanan BK (Pribadi, Sosial, Belajar, Karir) */}
        <GuidanceAreas onSelectAreaForBooking={handleSelectAreaForBooking} />

        {/* Asesmen Terpadu Berbasis Aplikasi AkuPintar (AKPD, Minat Bakat, Sosiometri, Gaya Belajar) */}
        <AssessmentAkuPintar onOpenBooking={handleOpenBooking} />

        {/* Multi-step Interactive Counseling Appointment Booking Flow */}
        <BookingSection
          scheduledSessions={scheduledSessions}
          onAddSession={handleAddSession}
          preselectedArea={preselectedArea}
        />

        {/* Student Voices: Anonymous Testimonials & Meaningful Experiences */}
        <StudentVoices onOpenBooking={handleOpenBooking} />

        {/* Student Reflection Journal Snippet */}
        <ReflectionJournal />

        {/* Career & Interest Compass (Kurikulum Merdeka) */}
        <CareerCompass onScheduleCareerConsult={handleOpenBooking} />

        {/* Kurikulum Merdeka & RPL BK Documentation Ledger (Klasikal, Kelompok, Individu, Kolaborasi, Home Visit) */}
        <RplDocumentation />

        {/* Counselor Profile & Counseling Room Ambience */}
        <CounselorProfile onOpenBooking={handleOpenBooking} />
      </main>

      {/* Floating AI Chatbot Widget in Bottom-Right Corner */}
      <ChatbotWidget onOpenBooking={handleOpenBooking} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
