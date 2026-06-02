import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  isMobile: boolean;
  isDark: boolean;
}

const SummerScreen: React.FC<Props> = ({ isMobile, isDark }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    // Target date: August 26 of the current year (or next year if already passed)
    const now = new Date();
    let target = new Date(now.getFullYear(), 7, 26, 8, 30, 0); // August 26, 8:30 AM
    if (now.getTime() > target.getTime()) {
      target = new Date(now.getFullYear() + 1, 7, 26, 8, 30, 0);
    }

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const difference = target.getTime() - currentTime;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      width: '100%',
      backgroundColor: isDark ? '#2D2E30' : '#FFFFFF',
      padding: isMobile ? '2rem 1rem' : '3vw',
      borderRadius: isMobile ? '1.45rem' : '1.2vw',
      boxShadow: isDark
        ? '0 2px 12px rgba(0, 0, 0, 0.5)'
        : '0 2px 12px rgba(0, 0, 0, 0.12)',
      textAlign: 'center' as const,
      boxSizing: 'border-box' as const,
    },
    title: {
      marginTop: 0,
      marginBottom: isMobile ? '1rem' : '1vw',
      fontSize: isMobile ? '36px' : '54px',
      color: '#B0263E',
      fontWeight: 700,
    },
    subtitle: {
      fontSize: isMobile ? '18px' : '24px',
      color: isDark ? '#E8EAED' : '#202124',
      marginBottom: isMobile ? '1.5rem' : '2vw',
    },
    countdownGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: isMobile ? '0.5rem' : '1vw',
      maxWidth: '600px',
      margin: '0 auto',
    },
    countdownItem: {
      backgroundColor: isDark ? '#3D3E40' : '#F1F3F4',
      padding: isMobile ? '1rem 0.5rem' : '1.5vw 1vw',
      borderRadius: isMobile ? '0.75rem' : '0.8vw',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
    },
    value: {
      fontSize: isMobile ? '28px' : '42px',
      fontWeight: 700,
      color: isDark ? '#E8EAED' : '#202124',
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
    },
    label: {
      fontSize: isMobile ? '12px' : '16px',
      color: isDark ? '#B0B5BA' : '#5F6368',
      marginTop: '0.5rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
  };

  if (!timeLeft) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Have a Great Summer!</h2>
        <div style={styles.subtitle}>Calculating time until school...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.container}
    >
      <h2 style={styles.title}>Have a Great Summer!</h2>
      <div style={styles.subtitle}>School starts on August 26th</div>
      
      <div style={styles.countdownGrid}>
        <div style={styles.countdownItem}>
          <div style={styles.value}>{timeLeft.days}</div>
          <div style={styles.label}>Days</div>
        </div>
        <div style={styles.countdownItem}>
          <div style={styles.value}>{timeLeft.hours}</div>
          <div style={styles.label}>Hours</div>
        </div>
        <div style={styles.countdownItem}>
          <div style={styles.value}>{timeLeft.minutes}</div>
          <div style={styles.label}>Mins</div>
        </div>
        <div style={styles.countdownItem}>
          <div style={styles.value}>{timeLeft.seconds}</div>
          <div style={styles.label}>Secs</div>
        </div>
      </div>
    </motion.div>
  );
};

export default SummerScreen;