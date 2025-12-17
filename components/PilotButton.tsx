'use client';

import Link from 'next/link';
import { useState } from 'react';

interface PilotButtonProps {
  href: string;
  className: string;
  children: React.ReactNode;
  source?: string;
}

export default function PilotButton({ href, className, children, source = 'Unknown' }: PilotButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent immediate navigation
    
    // Send e-post varsel
    setIsLoading(true);
    try {
      const response = await fetch('/api/pilot-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: source,
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
          referer: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
          console.error('Failed to send pilot click notification. Status:', response.status, 'Response:', data);
        } else {
          console.log('Pilot click notification sent successfully:', data);
        }
      } else {
        const text = await response.text();
        console.error('Failed to send pilot click notification. Status:', response.status, 'Response:', text);
      }
    } catch (error) {
      console.error('Failed to send pilot click notification:', error);
      // Continue anyway - don't block user action
    } finally {
      setIsLoading(false);
    }

    // Track in Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pilot_click', {
        event_category: 'engagement',
        event_label: source,
        value: 1,
      });
    }

    // Navigate after sending the notification
    if (typeof window !== 'undefined') {
      if (href.startsWith('#')) {
        // If it's a hash link, scroll to it
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else if (href.startsWith('/#')) {
            // If it's /#contact, navigate to / and then scroll
            window.location.href = href;
          } else {
            window.location.hash = href;
          }
        }, 100);
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {isLoading ? 'Sender...' : children}
    </Link>
  );
}

