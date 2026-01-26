import React, { useState, useEffect, useRef, forwardRef } from 'react';

// ============================================
// IMAGE PLACEHOLDERS - Replace with your paths
// ============================================
const IMAGES = {
  hero: '/images/Backdrops/hero.jpeg',
  creamBackdrop: '/images/Backdrops/cream.png',
  greenBackdrop: '/images/Backdrops/green.png',
  aboutPhoto: '/images/Backdrops/about-photo.jpg',
  parchment: '/images/Backdrops/parchment.png',
};

// ============================================
// MAIN APP - Single Scrollable Page
// ============================================
export default function EmeryScottPortfolio() {
  const [activeWing, setActiveWing] = useState(null); // 'acting', 'modeling', 'writing'
  const [wingTransitioning, setWingTransitioning] = useState(false);
  const [doorAnimationPhase, setDoorAnimationPhase] = useState(null);
  const [selectedDoor, setSelectedDoor] = useState(null);
  
  // Ref for scrolling to rotunda
  const rotundaRef = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflowX = 'hidden';
    document.body.style.background = '#e8dfd0';
  }, []);

  // State to tell acting wing to start in voiceover
  const [startInVoiceOver, setStartInVoiceOver] = useState(false);

  const openWing = (wing, goToVoiceOver = false) => {
    setSelectedDoor(wing);
    setActiveWing(wing);
    setWingTransitioning(true);
    setDoorAnimationPhase('expanding');
    setStartInVoiceOver(goToVoiceOver);
    
    // Scroll to the rotunda section
    if (rotundaRef.current) {
      rotundaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Door frame expands past viewer
    setTimeout(() => {
      setDoorAnimationPhase('gone');
    }, 600);
    
    // Content fades in
    setTimeout(() => {
      setWingTransitioning(false);
    }, 800);
  };

  const closeWing = () => {
    setWingTransitioning(true);
    setStartInVoiceOver(false);
    
    setTimeout(() => {
      setActiveWing(null);
      setDoorAnimationPhase('contracting');
    }, 300);
    
    setTimeout(() => {
      setSelectedDoor(null);
      setDoorAnimationPhase(null);
      setWingTransitioning(false);
    }, 900);
  };

  return (
    <div style={styles.page}>
      {/* Cream backdrop - always present */}
      <div style={styles.creamBackdrop} />

      {/* Candlelit Reveal Animation */}
      <CandlelitReveal />

      {/* Social Media Links - Top Right */}
      <div style={{
        position: 'fixed',
        top: '1.5rem',
        right: '2rem',
        display: 'flex',
        gap: '1.25rem',
        zIndex: 1000,
        alignItems: 'center',
      }}>
        <a href="https://www.instagram.com/emery_.s/?hl=en" target="_blank" rel="noopener noreferrer" style={{
          color: 'rgba(232, 223, 208, 0.7)',
          fontSize: '0.75rem',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          letterSpacing: '0.1em',
          textDecoration: 'none',
          transition: 'color 0.3s ease',
        }}>IG</a>
        <a href="https://www.youtube.com/@emeryscott" target="_blank" rel="noopener noreferrer" style={{
          color: 'rgba(232, 223, 208, 0.7)',
          fontSize: '0.75rem',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          letterSpacing: '0.1em',
          textDecoration: 'none',
          transition: 'color 0.3s ease',
        }}>YT</a>
        <a href="https://vimeo.com/emeryscott" target="_blank" rel="noopener noreferrer" style={{
          color: 'rgba(232, 223, 208, 0.7)',
          fontSize: '0.75rem',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          letterSpacing: '0.1em',
          textDecoration: 'none',
          transition: 'color 0.3s ease',
        }}>VM</a>
      </div>

      {/* Fixed Menu */}
      <nav style={styles.menu}>
        <MenuLink onClick={() => openWing('acting')}>Acting</MenuLink>
        <span style={styles.menuDot}>·</span>
        <MenuLink onClick={() => openWing('modeling')}>Modeling</MenuLink>
        <span style={styles.menuDot}>·</span>
        <MenuLink onClick={() => openWing('writing')}>Writing</MenuLink>
        <span style={styles.menuDot}>·</span>
        <MenuLink onClick={() => openWing('acting', true)}>Voice Over</MenuLink>
        <span style={styles.menuDot}>·</span>
        <MenuLink>Contact</MenuLink>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Quote Section - on parchment */}
      <QuoteSection />

      {/* About Section */}
      <AboutSection />

      {/* Rotunda Section - transforms into wings */}
      <RotundaSection 
        ref={rotundaRef}
        activeWing={activeWing}
        wingTransitioning={wingTransitioning}
        doorAnimationPhase={doorAnimationPhase}
        selectedDoor={selectedDoor}
        onOpenWing={openWing}
        onCloseWing={closeWing}
        startInVoiceOver={startInVoiceOver}
      />

      {/* Brown transition spacer */}
      <div style={{
        backgroundImage: 'url(/images/Backdrops/rotunda-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '8rem',
      }} />

      {/* Key Aspects Section */}
      <KeyAspectsSection />

      {/* Reviews Section - NYT Style */}
      <ReviewsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

// ============================================
// CANDLELIT REVEAL - Dark to warm light
// ============================================
function CandlelitReveal() {
  const [phase, setPhase] = useState(0);
  // Phase 0: Complete darkness
  // Phase 1: First flicker of warmth
  // Phase 2: Light spreading
  // Phase 3: Fully revealed

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 300);
    const timer2 = setTimeout(() => setPhase(2), 1000);
    const timer3 = setTimeout(() => setPhase(3), 2200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div style={{
      ...styles.candlelitOverlay,
      opacity: phase >= 3 ? 0 : 1,
      pointerEvents: phase >= 3 ? 'none' : 'auto',
    }}>
      {/* Dark veil that lifts */}
      <div style={{
        ...styles.darkVeil,
        opacity: phase === 0 ? 1 : phase === 1 ? 0.85 : phase === 2 ? 0.4 : 0,
      }} />
      
      {/* Warm glow that grows from center */}
      <div style={{
        ...styles.warmGlow,
        opacity: phase >= 1 ? 1 : 0,
        transform: phase === 1 
          ? 'scale(0.3)' 
          : phase === 2 
            ? 'scale(1.5)' 
            : 'scale(3)',
      }} />
      
      {/* Secondary candle flickers */}
      <div style={{
        ...styles.candleFlicker,
        left: '25%',
        opacity: phase >= 2 ? 0.6 : 0,
        transform: phase >= 2 ? 'scale(1)' : 'scale(0.5)',
      }} />
      <div style={{
        ...styles.candleFlicker,
        right: '25%',
        opacity: phase >= 2 ? 0.6 : 0,
        transform: phase >= 2 ? 'scale(1)' : 'scale(0.5)',
        transitionDelay: '0.2s',
      }} />
    </div>
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Sync with candlelit reveal - visible after darkness lifts
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={styles.heroSection}>
      <div style={styles.heroImageContainer}>
        <img src={IMAGES.hero} alt="Emery Scott" style={styles.heroImage} />
        
        <div style={{
          ...styles.nameBlock,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
        }}>
          <h1 style={styles.firstName}>EMERY</h1>
          <h1 style={styles.lastName}>SCOTT</h1>
          <div style={styles.titleBlock}>
            <p style={styles.titleLine}>Actress: Film / TV / Stage / Voiceover</p>
            <p style={styles.titleLine}>Model · Writer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// QUOTE SECTION - On Parchment
// ============================================
function QuoteSection() {
  return (
    <section style={styles.quoteSection}>
      {/* Teal fade from above */}
      <div style={styles.greenFade} />
      
      {/* Parchment paper */}
      <div style={styles.parchmentPaper}>
        <span style={styles.quoteMark}>"</span>
        <p style={styles.quoteText}>
          I have been with story. I have gone without. In only one of those states 
          did I feel I could truly live and so it lives always.
        </p>
        <p style={styles.quoteAttribution}>— E. Scott</p>
      </div>
    </section>
  );
}

// ============================================
// ABOUT SECTION
// ============================================
function AboutSection() {
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <section style={styles.aboutSection}>
      <div style={styles.aboutLayout}>
        <div style={styles.aboutTextSide}>
          <p style={styles.aboutLabel}>About</p>
          <p style={styles.aboutOpening}>
            As a lover of words, I ache to write too much. But I have decided to restrain myself. In brief...
          </p>
          <h2 style={styles.aboutHeadline}>
            I am a <StorytellerWord />
          </h2>
          <div style={styles.aboutSubsection}>
            <p style={styles.curiousText}>
              but are you not curious what I was going to write? You made it thus far
            </p>
            {!bioExpanded && (
              <p style={styles.clickReveal} onClick={() => setBioExpanded(true)}>
                What is but one more click?
              </p>
            )}
            <div style={{
              ...styles.bioExpanded,
              maxHeight: bioExpanded ? '1200px' : '0',
              opacity: bioExpanded ? 1 : 0,
              marginTop: bioExpanded ? '2rem' : '0',
            }}>
              <div style={styles.bioContent}>
                <p style={styles.bioParagraph}>
                  Actress, model, writer. My medium may shift, but the intent remains. 
                  Some call me a contradiction: ethereal in look, but when I open my mouth 
                  I become a fun-loving nut.
                </p>
                <p style={styles.bioParagraph}>
                  My training brought me to New York and I graduated from Molloy/CAP21 with a BFA; 
                  skills in dialects, in Chekhov and Meisner, singing, dancing—and yet I learned 
                  more about what I still don't know than what I do. Recently I've been cutting my 
                  teeth on Shakespeare's <em>The Merchant of Venice</em> and <em>Changing the 
                  Narrative: A Queer Cabaret</em>.
                </p>
                <p style={styles.bioParagraph}>
                  In modeling, I have enjoyed walking the runway for the CCP Cancer Awareness 
                  Fashion Show and collaborating on various concept shoots with independent photographers.
                </p>
                <p style={styles.bioParagraph}>
                  Fundamentally, to be an interesting artist, you have to be an interested person: 
                  in people, in life, in things that you both like and abhor. In my free time, I hike 
                  the wilds of Central Park, use the NYPL like my office, draw, play guitar, roller skate, 
                  and pretend like I have free time.
                </p>
                <p style={styles.closeReveal} onClick={() => setBioExpanded(false)}>
                  You read it all did you? Fantastic!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.aboutPhotoSide}>
          <div style={styles.photoFrame}>
            <img src={IMAGES.aboutPhoto} alt="Emery" style={styles.aboutPhoto} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// KEY ASPECTS SECTION - Highlighting Skills
// ============================================
function KeyAspectsSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const aspects = [
    {
      title: 'Dedication to Craft',
      subtitle: 'Making my roles impactful',
      description: 'I undergo extensive research and training for each role, immersing myself completely to ensure my performances are believable and resonant.'
    },
    {
      title: 'Strong Stage Presence',
      subtitle: 'Transitioning between film and theater',
      description: 'My commanding presence on both stage and screen captivates audiences, drawing them into the story and leaving a lasting impression.'
    },
    {
      title: 'Versatile Acting Range',
      subtitle: 'Harmonious in all genres',
      description: 'I demonstrate an impressive ability to embody diverse characters, seamlessly transitioning between dramatic and comedic roles with authenticity.'
    },
    {
      title: 'Emotional Depth',
      subtitle: "I don't just act - I live in the plot",
      description: 'I bring profound emotional depth to my characters, conveying complex feelings and inner turmoil with subtlety and nuance.'
    },
  ];

  return (
    <section ref={sectionRef} style={{
      backgroundImage: 'url(/images/Backdrops/key-aspects-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      padding: '6rem 2rem',
      position: 'relative',
    }}>
      {/* Instagram - Fixed right side */}
      <div style={{
        position: 'absolute',
        right: '2rem',
        top: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 0.3s',
        zIndex: 10,
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(180, 150, 120, 0.3), rgba(120, 90, 60, 0.3))',
          border: '2px solid rgba(180, 150, 120, 0.4)',
          overflow: 'hidden',
        }}>
          <img 
            src="/images/Backdrops/instagram-profile.jpg" 
            alt="Instagram" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        <div>
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1rem',
            color: '#e8dfd0',
            margin: '0 0 0.25rem 0',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}>Follow my Instagram</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '0.85rem',
            color: 'rgba(180, 150, 120, 0.7)',
            margin: 0,
            textShadow: '0 1px 3px rgba(0,0,0,0.4)',
          }}>
            <a href="https://www.instagram.com/emery_.s/?hl=en" target="_blank" rel="noopener noreferrer" style={{
              color: 'rgba(212, 175, 55, 0.8)',
              textDecoration: 'none',
            }}>@emery_.s</a>
          </p>
        </div>
      </div>

      {/* Header area */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '4rem',
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '0.85rem',
          color: 'rgba(180, 150, 120, 0.8)',
          letterSpacing: '0.2em',
          marginBottom: '1rem',
          textShadow: '0 1px 3px rgba(0,0,0,0.4)',
        }}>| FEATURES |</p>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 400,
          color: '#e8dfd0',
          margin: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}>
          Highlighting Key Aspects
        </h2>
      </div>

      {/* Divider */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 3rem auto',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(180, 150, 120, 0.3), transparent)',
      }} />

      {/* Content grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1.3fr) 1fr 1fr',
        gap: '3rem',
        alignItems: 'start',
      }}>
        {/* Left image - BIGGER */}
        <div style={{
          gridRow: 'span 2',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <div style={{
            aspectRatio: '3/4.5',
            background: 'rgba(60, 50, 40, 0.5)',
            border: '1px solid rgba(180, 150, 120, 0.2)',
            overflow: 'hidden',
            maxHeight: '600px',
          }}>
            <img 
              src="/images/Backdrops/features-photo.jpg" 
              alt="Emery" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Aspect cards - NO EMOJIS */}
        {aspects.map((aspect, index) => (
          <div 
            key={index}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s ease ${0.3 + index * 0.15}s`,
            }}
          >
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.4rem',
              fontWeight: 400,
              color: '#e8dfd0',
              margin: '0 0 0.5rem 0',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}>{aspect.title}</h3>
            <div style={{
              height: '1px',
              background: 'rgba(180, 150, 120, 0.3)',
              margin: '1rem 0',
            }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: 'rgba(180, 150, 120, 0.8)',
              margin: '0 0 1rem 0',
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
            }}>{aspect.subtitle}</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1rem',
              color: 'rgba(232, 223, 208, 0.75)',
              lineHeight: 1.7,
              margin: 0,
              textShadow: '0 1px 3px rgba(0,0,0,0.35)',
            }}>{aspect.description}</p>
          </div>
        ))}
      </div>

      {/* Bottom divider */}
      <div style={{
        maxWidth: '1200px',
        margin: '4rem auto 0 auto',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(180, 150, 120, 0.3), transparent)',
      }} />
    </section>
  );
}

// ============================================
// REVIEWS SECTION - Horizontal Ticker
// ============================================
function ReviewsSection() {
  const quotes = [
    { text: '"[She] really impressed me Tonight. *rais[ed] his Modelo*"', author: 'Casting Director' },
    { text: '"[She\'s] like a Perfect Apple. Like I want to take a bite, but also I can\'t."', author: 'A Random Woman' },
    { text: '"I Ha[dn\'t] had [that] much fun at shoot in a Long Time."', author: 'Photographer' },
    { text: '"If I could see inside [her] head I feel like I\'d be overwhelmed, but [she\'s] always on time and off book."', author: 'Director' },
    { text: '"[She is] trying to do a lot, but if theres anyone who can handle a lot its [her]."', author: 'My Editor' },
  ];

  // Duplicate for seamless loop
  const allQuotes = [...quotes, ...quotes];

  return (
    <section style={{
      backgroundImage: 'url(/images/Backdrops/key-aspects-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center bottom',
      padding: '3rem 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      
      {/* Ticker with fade edges */}
      <div style={{
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'tickerScroll 70s linear infinite',
        }}>
          {allQuotes.map((quote, index) => (
            <div 
              key={index}
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                whiteSpace: 'normal',
                width: '260px',
                marginRight: '100px',
              }}
            >
              <span style={{
                fontFamily: "'Times New Roman', Georgia, serif",
                fontSize: '19px',
                color: '#F6ECE9',
                lineHeight: 1.25,
                display: 'block',
                marginBottom: '10px',
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}>
                {quote.text}
              </span>
              <span style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '10px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#F6ECE9',
                opacity: 0.6,
                display: 'block',
                textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              }}>
                — {quote.author}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CONTACT SECTION - Get in Touch (Garden)
// ============================================
function ContactSection() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll be in touch soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section ref={sectionRef} style={{
      backgroundImage: 'url(/images/Backdrops/contact-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '5rem 2rem',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '4rem',
        alignItems: 'center',
      }}>
        {/* Left - Image */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.8s ease',
        }}>
          <div style={{
            aspectRatio: '4/5',
            background: 'rgba(60, 50, 40, 0.3)',
            border: '1px solid rgba(180, 150, 120, 0.2)',
            overflow: 'hidden',
          }}>
            <img 
              src="/images/Backdrops/contact-photo.jpg" 
              alt="Get in touch" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        </div>

        {/* Right - Form */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '0.85rem',
            color: 'rgba(80, 60, 50, 0.8)',
            letterSpacing: '0.2em',
            marginBottom: '1rem',
          }}>| WRITE ME |</p>
          
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 2.8rem)',
            fontWeight: 400,
            color: 'rgba(50, 35, 30, 0.95)',
            margin: '0 0 1rem 0',
          }}>Get in Touch With Me!</h2>
          
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.1rem',
            color: 'rgba(70, 50, 40, 0.8)',
            marginBottom: '2.5rem',
          }}>Join the conversation and be part of my journey!</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input
              type="text"
              placeholder="Name*"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                borderBottom: '1px solid rgba(80, 60, 50, 0.3)',
                padding: '1rem 0.5rem',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1rem',
                color: 'rgba(50, 35, 30, 0.9)',
                outline: 'none',
              }}
            />
            <input
              type="email"
              placeholder="Email*"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                borderBottom: '1px solid rgba(80, 60, 50, 0.3)',
                padding: '1rem 0.5rem',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1rem',
                color: 'rgba(50, 35, 30, 0.9)',
                outline: 'none',
              }}
            />
            <textarea
              placeholder="Your Message*"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                borderBottom: '1px solid rgba(80, 60, 50, 0.3)',
                padding: '1rem 0.5rem',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1rem',
                color: 'rgba(50, 35, 30, 0.9)',
                outline: 'none',
                resize: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'rgba(120, 90, 70, 0.8)',
                border: 'none',
                padding: '1rem 2rem',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1rem',
                color: '#f5f0e8',
                cursor: 'pointer',
                marginTop: '1rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(140, 100, 70, 0.9)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(120, 90, 70, 0.8)'}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER SECTION - Minimal with Social
// ============================================
function FooterSection() {
  return (
    <footer style={{
      background: '#0a0908',
      padding: '3rem 2rem 2rem 2rem',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}>
        {/* Main CTA */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 400,
            color: '#e8dfd0',
            margin: '0 0 0.5rem 0',
            lineHeight: 1.4,
          }}>
            Hire Me for Your <span style={{ color: 'rgba(180, 150, 120, 0.9)' }}>Creative</span> Project
          </h3>
        </div>

        {/* Social Links */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}>
          <a href="https://www.instagram.com/emery_.s/?hl=en" target="_blank" rel="noopener noreferrer" style={{
            color: 'rgba(232, 223, 208, 0.6)',
            fontSize: '0.8rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: '0.15em',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}>INSTAGRAM</a>
          <span style={{ color: 'rgba(180, 150, 120, 0.3)' }}>·</span>
          <a href="https://www.youtube.com/@emeryscott" target="_blank" rel="noopener noreferrer" style={{
            color: 'rgba(232, 223, 208, 0.6)',
            fontSize: '0.8rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: '0.15em',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}>YOUTUBE</a>
          <span style={{ color: 'rgba(180, 150, 120, 0.3)' }}>·</span>
          <a href="https://vimeo.com/emeryscott" target="_blank" rel="noopener noreferrer" style={{
            color: 'rgba(232, 223, 208, 0.6)',
            fontSize: '0.8rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: '0.15em',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}>VIMEO</a>
        </div>

        {/* Divider */}
        <div style={{
          width: '60px',
          height: '1px',
          background: 'rgba(180, 150, 120, 0.2)',
        }} />

        {/* Copyright */}
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '0.8rem',
          color: 'rgba(180, 150, 120, 0.35)',
          margin: 0,
          letterSpacing: '0.1em',
        }}>
          © 2025 Emery Scott
        </p>
      </div>
    </footer>
  );
}

// ============================================
// ROTUNDA SECTION - Transforms into Wings
// ============================================
const RotundaSection = forwardRef(function RotundaSection({ activeWing, wingTransitioning, doorAnimationPhase, selectedDoor, onOpenWing, onCloseWing, startInVoiceOver }, ref) {
  const [actingView, setActingView] = useState('choice');
  
  // Reset actingView when leaving acting wing
  useEffect(() => {
    if (activeWing !== 'acting') {
      setActingView('choice');
    }
  }, [activeWing]);
  
  // Determine which background should show
  const showVoiceOverBg = activeWing === 'acting' && actingView === 'voiceover';
  const showActingBg = activeWing === 'acting' && actingView !== 'voiceover';
  const showModelingBg = activeWing === 'modeling';
  const showWritingBg = activeWing === 'writing';
  
  return (
    <section ref={ref} style={styles.rotunda}>
      {/* LAYERED BACKGROUNDS - base always visible to prevent flash */}
      
      {/* Base layer: leather rotunda - always visible as foundation */}
      <div style={{
        ...styles.rotundaBackground,
        backgroundImage: 'url(/images/Backdrops/rotunda-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />
      
      {/* Acting: Rich theatrical brocade */}
      <div style={{
        ...styles.rotundaBackground,
        backgroundImage: 'url(/images/Backdrops/acting-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: showActingBg ? 1 : 0,
        zIndex: 1,
      }} />
      
      {/* VoiceOver: Deep atmospheric backdrop */}
      <div style={{
        ...styles.rotundaBackground,
        backgroundImage: 'url(/images/Backdrops/voiceover-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: showVoiceOverBg ? 1 : 0,
        zIndex: 2,
      }} />
      
      {/* Modeling: Soft lavender with filigree */}
      <div style={{
        ...styles.rotundaBackground,
        backgroundImage: 'url(/images/Backdrops/modeling-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: showModelingBg ? 1 : 0,
        zIndex: 1,
      }} />
      
      {/* Writing: Warm parchment with script */}
      <div style={{
        ...styles.rotundaBackground,
        backgroundImage: 'url(/images/Backdrops/writing-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: showWritingBg ? 1 : 0,
        zIndex: 1,
      }} />

      {/* Fire/atmosphere texture for acting wing (not voiceover) */}
      <div style={{
        ...styles.fireTexture,
        opacity: showActingBg ? 1 : 0,
        zIndex: 3,
      }} />

      {/* "Enter a Wing" label */}
      <p style={{
        ...styles.rotundaLabel,
        opacity: doorAnimationPhase || activeWing ? 0 : 1,
      }}>
        Enter a Wing
      </p>

      {/* Container for doors AND wing content */}
      <div style={styles.rotundaContent}>
        {/* Three Doors */}
        <div style={{
          ...styles.doorways,
          opacity: doorAnimationPhase === 'expanding' || doorAnimationPhase === 'gone' || activeWing ? 0 : 1,
          pointerEvents: activeWing || doorAnimationPhase ? 'none' : 'auto',
          position: activeWing ? 'absolute' : 'relative',
          transition: doorAnimationPhase === 'contracting' 
            ? 'opacity 0.4s ease 0.2s' 
            : 'opacity 0.3s ease',
        }}>
          <DoorwayComponent 
            title="ACTING" 
            whisper="Film / Television / Stage"
            glowColor="rgba(139, 58, 58, 0.65)"
            onClick={() => onOpenWing('acting')}
            animationPhase={doorAnimationPhase}
            isSelected={selectedDoor === 'acting'}
          />
          <DoorwayComponent 
            title="MODELING" 
            whisper="Digitals / Commercial / Editorial"
            glowColor="rgba(232, 213, 208, 0.4)"
            onClick={() => onOpenWing('modeling')}
            animationPhase={doorAnimationPhase}
            isSelected={selectedDoor === 'modeling'}
          />
          <DoorwayComponent 
            title="WRITING" 
            whisper="Epic Fantasy / The Page"
            glowColor="rgba(196, 163, 90, 0.55)"
            onClick={() => onOpenWing('writing')}
            animationPhase={doorAnimationPhase}
            isSelected={selectedDoor === 'writing'}
          />
        </div>

        {/* Wing Content */}
        {activeWing === 'acting' && (
          <ActingWingContent 
            transitioning={wingTransitioning}
            onBack={onCloseWing}
            onViewChange={setActingView}
            startInVoiceOver={startInVoiceOver}
          />
        )}

        {activeWing === 'modeling' && (
          <ModelingWingContent 
            transitioning={wingTransitioning}
            onBack={onCloseWing}
          />
        )}

        {activeWing === 'writing' && (
          <WritingWingContent 
            transitioning={wingTransitioning}
            onBack={onCloseWing}
          />
        )}
      </div>
    </section>
  );
});

// ============================================
// DOORWAY COMPONENT
// ============================================
function DoorwayComponent({ title, whisper, glowColor, onClick, animationPhase, isSelected }) {
  const [hovered, setHovered] = useState(false);
  
  // Animation states:
  // 'expanding' + isSelected: door flies OUT (scale up, fade)
  // 'expanding' + !isSelected: other doors fade into shadow
  // 'gone': door is invisible (only selected door was here)
  // 'contracting' + isSelected: door flies BACK IN (scale down from expanded)
  // 'contracting' + !isSelected: other doors fade back in
  
  const isExpanding = animationPhase === 'expanding' && isSelected;
  const isFadingOut = animationPhase === 'expanding' && !isSelected;
  const isGone = animationPhase === 'gone' && isSelected;
  const isContractingIn = animationPhase === 'contracting' && isSelected;
  const isFadingIn = animationPhase === 'contracting' && !isSelected;
  
  // Determine transform
  let transform = hovered ? 'translateY(-12px)' : 'translateY(0)';
  if (isExpanding || isGone) {
    transform = 'scale(15)';
  } else if (isContractingIn) {
    transform = 'scale(1)'; // Animates FROM scale(15) TO scale(1)
  }
  
  // Determine opacity
  let opacity = 1;
  if (isExpanding || isGone || isFadingOut) {
    opacity = 0;
  } else if (isFadingIn || isContractingIn) {
    opacity = 1; // Fading back in
  }
  
  // Determine transition
  let transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease';
  if (isExpanding) {
    transition = 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s ease 0.2s';
  } else if (isFadingOut) {
    transition = 'opacity 0.3s ease';
  } else if (isContractingIn) {
    // Flying back in - needs to START at scale 15 and animate to scale 1
    transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s ease';
  } else if (isFadingIn) {
    transition = 'opacity 0.4s ease 0.2s';
  }
  
  return (
    <div 
      style={{
        ...styles.doorway,
        transform,
        opacity,
        transition,
        cursor: animationPhase ? 'default' : 'pointer',
        pointerEvents: animationPhase ? 'none' : 'auto',
      }}
      onMouseEnter={() => !animationPhase && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={!animationPhase ? onClick : undefined}
    >
      <div style={{
        ...styles.doorArch,
        borderColor: hovered ? 'rgba(244, 239, 228, 0.5)' : 'rgba(244, 239, 228, 0.15)',
      }}>
        <div style={{
          ...styles.doorGlow,
          background: `radial-gradient(ellipse at 50% 100%, ${glowColor} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.3,
        }} />
      </div>
      <div style={{
        ...styles.doorLight,
        opacity: hovered ? 0.6 : 0,
        height: hovered ? '140px' : '80px',
      }} />
      <div style={styles.doorContent}>
        <h3 style={{
          ...styles.doorTitle,
          letterSpacing: hovered ? '0.28em' : '0.15em',
        }}>{title}</h3>
        <p style={{
          ...styles.doorWhisper,
          opacity: animationPhase ? 0 : 0.7,
          transition: 'opacity 0.2s ease',
        }}>{whisper}</p>
      </div>
    </div>
  );
}

// ============================================
// ACTING WING CONTENT - Content always present, glass slides away
// ============================================
function ActingWingContent({ transitioning, onBack, onViewChange, startInVoiceOver }) {
  const [glassOpen, setGlassOpen] = useState(null); // null, 'reels', 'galleries'
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [appeared, setAppeared] = useState(false);
  const [voiceOverDropping, setVoiceOverDropping] = useState(false);
  const [inVoiceOver, setInVoiceOver] = useState(startInVoiceOver || false);

  useEffect(() => {
    const timer = setTimeout(() => setAppeared(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // If startInVoiceOver changes to true, go to voiceover
  useEffect(() => {
    if (startInVoiceOver) {
      setInVoiceOver(true);
    }
  }, [startInVoiceOver]);

  // Report view changes to parent for background control
  useEffect(() => {
    if (onViewChange) {
      onViewChange(inVoiceOver ? 'voiceover' : 'choice');
    }
  }, [inVoiceOver, onViewChange]);

  const handleOpenGlass = (side) => {
    if (side === 'voiceover') {
      setVoiceOverDropping(true);
      setTimeout(() => {
        setInVoiceOver(true);
        setVoiceOverDropping(false);
      }, 500);
      return;
    }
    setGlassOpen(side);
  };

  const handleBack = () => {
    if (expandedVideo) {
      setExpandedVideo(null);
      return;
    }
    if (inVoiceOver) {
      setInVoiceOver(false);
      return;
    }
    if (glassOpen) {
      setGlassOpen(null);
      return;
    }
    onBack();
  };

  // Get title based on current state
  const getTitle = () => {
    if (inVoiceOver) return 'VOICE OVER';
    if (glassOpen === 'reels') return 'REELS';
    if (glassOpen === 'galleries') return 'GALLERIES';
    return 'ACTING';
  };

  // Hover states for glass
  const [reelsHovered, setReelsHovered] = useState(false);
  const [galleriesHovered, setGalleriesHovered] = useState(false);
  const [voiceOverHovered, setVoiceOverHovered] = useState(false);

  return (
    <div style={{
      ...styles.wingContent,
      opacity: transitioning ? 0 : 1,
    }}>
      {/* HEADER LINE - Back button + Title */}
      <div style={styles.headerLine}>
        <button style={styles.headerBackButton} onClick={handleBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <h1 style={{
          ...styles.headerTitle,
          opacity: appeared ? 1 : 0,
          color: inVoiceOver ? '#a08088' : '#e8dfd0',
        }}>
          {getTitle()}
        </h1>
        
        <div style={{ width: '40px' }} />
      </div>

      {/* CONTENT AREA */}
      <div style={styles.contentArea}>
        
        {/* VoiceOver View - separate */}
        {inVoiceOver ? (
          <VoiceOverView />
        ) : (
          /* Main content with glass overlay */
          <div style={{
            ...styles.choiceContainer,
            transform: voiceOverDropping ? 'translateY(-100vh)' : 'translateY(0)',
            opacity: voiceOverDropping ? 0 : 1,
          }}>
            {/* Container with content + glass */}
            <div style={styles.glassContainer}>
              
              {/* REAL CONTENT - always here */}
              <div style={styles.contentUnderneath}>
                {/* Reels content - left half */}
                <div style={{
                  ...styles.halfContent,
                  flex: glassOpen === 'reels' ? '1 0 100%' : glassOpen === 'galleries' ? '0 0 0%' : '1 0 50%',
                  opacity: glassOpen === 'galleries' ? 0 : 1,
                }}>
                  <ReelsContent 
                    expandedVideo={expandedVideo}
                    onVideoSelect={(id) => setExpandedVideo(expandedVideo === id ? null : id)}
                    isActive={glassOpen === 'reels'}
                  />
                </div>
                
                {/* Galleries content - right half */}
                <div style={{
                  ...styles.halfContent,
                  flex: glassOpen === 'galleries' ? '1 0 100%' : glassOpen === 'reels' ? '0 0 0%' : '1 0 50%',
                  opacity: glassOpen === 'reels' ? 0 : 1,
                }}>
                  <GalleriesContent isActive={glassOpen === 'galleries'} />
                </div>
              </div>

              {/* GLASS LAYER - slides away to reveal content */}
              <div style={{
                ...styles.glassOverlayContainer,
                pointerEvents: glassOpen ? 'none' : 'auto',
              }}>
                {/* REELS glass pane */}
                <div 
                  style={{
                    ...styles.glassPane,
                    transform: glassOpen ? 'translateX(-100%)' : 'translateX(0)',
                    opacity: glassOpen ? 0 : 1,
                  }}
                  onMouseEnter={() => setReelsHovered(true)}
                  onMouseLeave={() => setReelsHovered(false)}
                  onClick={() => handleOpenGlass('reels')}
                >
                  <div style={styles.glassFrost} />
                  <h2 style={{
                    ...styles.paneTitle,
                    textShadow: reelsHovered 
                      ? '0 0 30px rgba(212, 175, 55, 0.5), 0 0 60px rgba(212, 175, 55, 0.2)' 
                      : '0 0 15px rgba(212, 175, 55, 0.2)',
                  }}>
                    Reels
                  </h2>
                </div>

                {/* Dividing line - gold accent */}
                <div style={{
                  ...styles.dividingLine,
                  opacity: glassOpen ? 0 : 1,
                }} />

                {/* GALLERIES glass pane */}
                <div 
                  style={{
                    ...styles.glassPane,
                    transform: glassOpen ? 'translateX(100%)' : 'translateX(0)',
                    opacity: glassOpen ? 0 : 1,
                  }}
                  onMouseEnter={() => setGalleriesHovered(true)}
                  onMouseLeave={() => setGalleriesHovered(false)}
                  onClick={() => handleOpenGlass('galleries')}
                >
                  <div style={styles.glassFrost} />
                  <h2 style={{
                    ...styles.paneTitle,
                    textShadow: galleriesHovered 
                      ? '0 0 30px rgba(212, 175, 55, 0.5), 0 0 60px rgba(212, 175, 55, 0.2)' 
                      : '0 0 15px rgba(212, 175, 55, 0.2)',
                  }}>
                    Galleries
                  </h2>
                </div>
              </div>
            </div>

            {/* VOICE OVER trapdoor */}
            <div 
              style={{
                ...styles.trapdoorPane,
                opacity: appeared && !glassOpen ? 1 : 0,
                pointerEvents: glassOpen ? 'none' : 'auto',
              }}
              onMouseEnter={() => setVoiceOverHovered(true)}
              onMouseLeave={() => setVoiceOverHovered(false)}
              onClick={() => handleOpenGlass('voiceover')}
            >
              <div style={{
                ...styles.trapdoorGlow,
                opacity: voiceOverHovered ? 0.5 : 0.15,
              }} />
              <p style={{
                ...styles.trapdoorLabel,
                letterSpacing: voiceOverHovered ? '0.35em' : '0.2em',
                opacity: voiceOverHovered ? 0.9 : 0.5,
              }}>
                Voice Over
              </p>
              <div style={{
                ...styles.trapdoorHint,
                opacity: voiceOverHovered ? 0.4 : 0,
                transform: voiceOverHovered ? 'translateY(5px)' : 'translateY(0)',
              }}>
                ↓
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// REELS CONTENT - The actual reels bars
// ============================================
function ReelsContent({ expandedVideo, onVideoSelect, isActive }) {
  const categories = [
    { id: 'film', label: 'Film/TV', video: 'dQw4w9WgXcQ' },
    { id: 'vocals', label: 'Vocals', video: 'dQw4w9WgXcQ' },
    { id: 'dance', label: 'Dance', video: 'dQw4w9WgXcQ' },
    { id: 'stage', label: 'Stage', video: 'dQw4w9WgXcQ' },
    { id: 'commercial', label: 'Commercial', video: 'dQw4w9WgXcQ' },
  ];

  return (
    <div style={styles.reelsContentContainer}>
      {categories.map((cat) => {
        const isExpanded = expandedVideo === cat.id;
        const hasExpanded = expandedVideo !== null;
        
        return (
          <div 
            key={cat.id}
            style={{
              ...styles.reelBar,
              flex: isExpanded ? '1 1 70%' : hasExpanded ? '0 0 50px' : '1 1 18%',
              cursor: isActive ? 'pointer' : 'default',
              pointerEvents: isActive ? 'auto' : 'none',
            }}
            onClick={() => isActive && onVideoSelect(cat.id)}
          >
            {isExpanded ? (
              <div style={styles.videoContainer}>
                <iframe
                  style={styles.videoIframe}
                  src={`https://www.youtube.com/embed/${cat.video}?autoplay=1`}
                  title={cat.label}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div style={styles.reelBarLabel}>
                <span style={{
                  ...styles.reelBarText,
                  writingMode: hasExpanded ? 'vertical-rl' : 'horizontal-tb',
                  fontSize: hasExpanded ? '0.75rem' : '0.85rem',
                }}>
                  {cat.label}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// GALLERIES CONTENT - The actual gallery cards
// ============================================
function GalleriesContent({ isActive }) {
  const [expandedId, setExpandedId] = useState(null);
  
  const galleryItems = [
    { 
      id: 1, 
      title: 'The Merchant of Venice', 
      role: 'Portia',
      image: '/images/galleries/merchant-of-venice.jpg',
      description: 'A modern retelling of Shakespeare\'s classic, exploring themes of justice and mercy in contemporary society.'
    },
    { 
      id: 2, 
      title: 'Changing the Narrative', 
      role: 'Various',
      image: '/images/galleries/changing-narrative.jpg',
      description: 'An anthology film examining perspectives across generations, cultures, and lived experiences.'
    },
    { 
      id: 3, 
      title: 'Indie Film Project', 
      role: 'Lead',
      image: '/images/galleries/indie-project.jpg',
      description: 'An intimate character study following a woman\'s journey of self-discovery after unexpected loss.'
    },
  ];

  return (
    <div style={styles.galleriesContentContainer}>
      {galleryItems.map((item) => (
        <div 
          key={item.id}
          onClick={() => isActive && setExpandedId(expandedId === item.id ? null : item.id)}
          style={{
            ...styles.galleryCard,
            cursor: isActive ? 'pointer' : 'default',
            pointerEvents: isActive ? 'auto' : 'none',
          }}
        >
          <div style={styles.galleryCardImage}>
            <img 
              src={item.image} 
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span style={{...styles.galleryCardPlaceholder, display: 'none'}}>Image</span>
          </div>
          <div style={styles.galleryCardText}>
            <h3 style={styles.galleryCardTitle}>{item.title}</h3>
            <p style={styles.galleryCardRole}>{item.role}</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '0.85rem',
              color: 'rgba(232, 223, 208, 0.7)',
              lineHeight: 1.5,
              marginTop: '0.5rem',
              maxHeight: expandedId === item.id ? '200px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.4s ease',
            }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// VOICE OVER VIEW - Inside Acting Wing (darker atmosphere)
// ============================================
function VoiceOverView() {
  const [appeared, setAppeared] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAppeared(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div style={{
      width: '90%',
      maxWidth: '800px',
      minHeight: '55vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Animated sound wave lines - Left cluster (creeping from edge) */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        gap: '3px',
        alignItems: 'center',
        paddingLeft: '10px',
      }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={`wave-left-${i}`}
            style={{
              width: '2px',
              height: `${8 + Math.sin(i * 0.5) * 35 + i * 2}px`,
              background: `linear-gradient(180deg, transparent, rgba(212, 175, 55, ${0.3 + i * 0.03}), transparent)`,
              borderRadius: '2px',
              opacity: appeared ? (isPlaying ? 0.8 : 0.3) : 0,
              transition: `opacity 0.5s ease ${i * 0.05}s, height 0.3s ease`,
              animation: isPlaying ? `soundWave ${0.3 + i * 0.05}s ease-in-out infinite alternate` : 'none',
              animationDelay: `${i * 0.03}s`,
            }}
          />
        ))}
      </div>
      
      {/* Animated sound wave lines - Right cluster (creeping from edge) */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        gap: '3px',
        alignItems: 'center',
        paddingRight: '10px',
        flexDirection: 'row-reverse',
      }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={`wave-right-${i}`}
            style={{
              width: '2px',
              height: `${8 + Math.sin(i * 0.5) * 35 + i * 2}px`,
              background: `linear-gradient(180deg, transparent, rgba(212, 175, 55, ${0.3 + i * 0.03}), transparent)`,
              borderRadius: '2px',
              opacity: appeared ? (isPlaying ? 0.8 : 0.3) : 0,
              transition: `opacity 0.5s ease ${i * 0.05}s, height 0.3s ease`,
              animation: isPlaying ? `soundWave ${0.3 + i * 0.05}s ease-in-out infinite alternate` : 'none',
              animationDelay: `${i * 0.03}s`,
            }}
          />
        ))}
      </div>

      {/* Ripple circles emanating from center */}
      {isPlaying && (
        <>
          <div style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            animation: 'rippleOut 2s ease-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            animation: 'rippleOut 2s ease-out infinite 0.5s',
          }} />
          <div style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            animation: 'rippleOut 2s ease-out infinite 1s',
          }} />
        </>
      )}

      {/* Audio element - hidden */}
      <audio 
        ref={audioRef} 
        src="/audio/voiceover-demo.mp3"
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Demo Reel Player */}
      <div style={{
        opacity: appeared ? 1 : 0,
        transform: appeared ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease',
        textAlign: 'center',
        width: '100%',
        zIndex: 1,
      }}>
        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
          fontWeight: 500,
          fontStyle: 'italic',
          color: 'rgba(212, 175, 55, 0.7)',
          letterSpacing: '0.15em',
          marginBottom: '3rem',
        }}>
          Demo Reel
        </h3>

        {/* Play button */}
        <button
          onClick={togglePlay}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isPlaying ? (
            // Pause icon
            <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(212, 175, 55, 0.8)">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            // Play icon
            <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(212, 175, 55, 0.8)">
              <polygon points="8,5 20,12 8,19" />
            </svg>
          )}
        </button>

        {/* Status text */}
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '0.9rem',
          color: 'rgba(180, 150, 120, 0.5)',
          fontStyle: 'italic',
          letterSpacing: '0.1em',
          marginTop: '2rem',
        }}>
          {isPlaying ? 'Now playing...' : 'Click to play'}
        </p>
      </div>
    </div>
  );
}

// ============================================
// MODELING WING CONTENT - Digitals + Galleries
// ============================================
function ModelingWingContent({ transitioning, onBack }) {
  const [appeared, setAppeared] = useState(false);
  const [openGallery, setOpenGallery] = useState(null); // 'runway', 'commercial', 'editorial'

  useEffect(() => {
    const timer = setTimeout(() => setAppeared(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleGallery = (gallery) => {
    setOpenGallery(openGallery === gallery ? null : gallery);
  };

  // Gallery mood colors - subtle overlays for lighter background
  const galleryMoods = {
    runway: { bg: 'rgba(90, 85, 95, 0.12)', accent: 'rgba(100, 80, 90, 0.6)' },
    commercial: { bg: 'rgba(100, 90, 80, 0.1)', accent: 'rgba(140, 100, 80, 0.5)' },
    editorial: { bg: 'rgba(70, 65, 75, 0.15)', accent: 'rgba(80, 70, 80, 0.6)' },
  };

  const currentMood = openGallery ? galleryMoods[openGallery] : null;

  return (
    <div style={{
      ...styles.wingContent,
      opacity: transitioning ? 0 : 1,
    }}>
      {/* HEADER */}
      <div style={styles.headerLine}>
        <button style={{
          ...styles.headerBackButton,
          borderColor: 'rgba(100, 80, 90, 0.35)',
          color: 'rgba(70, 55, 65, 0.8)',
        }} onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 style={{
          ...styles.headerTitle,
          opacity: appeared ? 1 : 0,
          color: 'rgba(60, 45, 55, 0.9)',
          textShadow: '0 0 30px rgba(180, 140, 150, 0.2)',
        }}>
          MODELING
        </h1>
        <div style={{ width: '40px' }} />
      </div>

      {/* CONTENT - Scrollable */}
      <div style={{
        ...styles.contentArea,
        overflowY: 'auto',
        paddingBottom: '4rem',
        alignItems: 'stretch',
      }}>
        {/* DIGITALS SECTION - Always visible */}
        <div style={{
          opacity: appeared ? 1 : 0,
          transform: appeared ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
          marginBottom: '3rem',
          width: '100%',
          padding: '0 2rem',
        }}>
          <h2 style={styles.modelingSectionTitle}>Digitals</h2>
          
          {/* Comp Card Layout - Horizontal with large headshot */}
          <div style={styles.compCardLayout}>
            {/* Large Headshot - Left side */}
            <div style={styles.compHeadshot}>
              <div style={styles.digitalPlaceholderLarge}>
                <span style={styles.digitalLabel}>HEADSHOT</span>
                <span style={styles.digitalFilename}>headshot.jpg</span>
              </div>
            </div>
            
            {/* Other shots - Right side grid */}
            <div style={styles.compSideGrid}>
              <div style={styles.compSidePhoto}>
                <div style={styles.digitalPlaceholder}>
                  <span style={styles.digitalLabel}>HALF UP FRONT</span>
                  <span style={styles.digitalFilename}>half-up-front.jpg</span>
                </div>
              </div>
              <div style={styles.compSidePhoto}>
                <div style={styles.digitalPlaceholder}>
                  <span style={styles.digitalLabel}>HALF UP BACK</span>
                  <span style={styles.digitalFilename}>half-up-back.jpg</span>
                </div>
              </div>
              <div style={styles.compSidePhoto}>
                <div style={styles.digitalPlaceholder}>
                  <span style={styles.digitalLabel}>FULL BODY FRONT</span>
                  <span style={styles.digitalFilename}>full-front.jpg</span>
                </div>
              </div>
              <div style={styles.compSidePhoto}>
                <div style={styles.digitalPlaceholder}>
                  <span style={styles.digitalLabel}>FULL BODY BACK</span>
                  <span style={styles.digitalFilename}>full-back.jpg</span>
                </div>
              </div>
              <div style={styles.compSidePhoto}>
                <div style={styles.digitalPlaceholder}>
                  <span style={styles.digitalLabel}>SIDE PROFILE LEFT</span>
                  <span style={styles.digitalFilename}>side-left.jpg</span>
                </div>
              </div>
              <div style={styles.compSidePhoto}>
                <div style={styles.digitalPlaceholder}>
                  <span style={styles.digitalLabel}>SIDE PROFILE RIGHT</span>
                  <span style={styles.digitalFilename}>side-right.jpg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GALLERY BUTTONS - Always visible */}
        <div style={{
          opacity: appeared ? 1 : 0,
          transition: 'opacity 0.6s ease 0.2s',
          width: '100%',
          padding: '0 2rem',
        }}>
          <h2 style={styles.modelingSectionTitle}>Galleries</h2>
          
          <div style={styles.galleryButtons}>
            {['runway', 'commercial', 'editorial'].map((gallery) => (
              <button
                key={gallery}
                onClick={() => toggleGallery(gallery)}
                style={{
                  ...styles.galleryButton,
                  background: openGallery === gallery 
                    ? 'rgba(100, 80, 90, 0.15)' 
                    : 'rgba(100, 80, 90, 0.05)',
                  borderColor: openGallery === gallery 
                    ? 'rgba(100, 80, 90, 0.4)' 
                    : 'rgba(100, 80, 90, 0.2)',
                }}
              >
                {gallery.charAt(0).toUpperCase() + gallery.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* GALLERY CONTENT - Expands below buttons */}
        {openGallery && (
          <div style={{
            marginTop: '2rem',
            padding: '2rem',
            background: currentMood?.bg || 'transparent',
            borderRadius: '4px',
            transition: 'all 0.4s ease',
            width: '100%',
          }}>
            {openGallery === 'runway' && (
              <RunwayGallery accent={currentMood.accent} />
            )}
            {openGallery === 'commercial' && (
              <CommercialGallery accent={currentMood.accent} />
            )}
            {openGallery === 'editorial' && (
              <EditorialGallery accent={currentMood.accent} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Runway Gallery - Walk video + runway photos (flowing layout)
function RunwayGallery({ accent }) {
  return (
    <div style={styles.flowingGallery}>
      {/* Video featured */}
      <div style={styles.runwayVideoFeature}>
        <div style={styles.runwayVideoPlaceholder}>
          <span style={styles.digitalLabel}>RUNWAY WALK VIDEO</span>
          <span style={styles.digitalFilename}>runway-walk.mp4</span>
        </div>
      </div>
      
      {/* Photos flowing around */}
      <div style={styles.flowingPhotos}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} style={styles.flowingPhoto}>
            <div style={styles.galleryPhotoPlaceholder}>
              <span style={styles.digitalFilename}>runway-{num}.jpg</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Commercial Gallery - Bright and smiling (masonry-like flow)
function CommercialGallery({ accent }) {
  return (
    <div style={styles.masonryGallery}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <div key={num} style={{
          ...styles.masonryPhoto,
          // Vary sizes for visual interest
          gridRow: num === 1 || num === 5 ? 'span 2' : 'span 1',
        }}>
          <div style={{
            ...styles.galleryPhotoPlaceholder,
            background: 'rgba(120, 100, 90, 0.12)',
          }}>
            <span style={styles.digitalFilename}>commercial-{num}.jpg</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Editorial Gallery - Grungier, moodier (cinematic horizontal)
function EditorialGallery({ accent }) {
  return (
    <div style={styles.cinematicGallery}>
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <div key={num} style={styles.cinematicPhoto}>
          <div style={{
            ...styles.galleryPhotoPlaceholder,
            background: 'rgba(70, 65, 75, 0.15)',
          }}>
            <span style={styles.digitalFilename}>editorial-{num}.jpg</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// WRITING WING CONTENT - Fairy Jungle Sunrise
// ============================================
function WritingWingContent({ transitioning, onBack }) {
  const [appeared, setAppeared] = useState(false);
  const [expandedStory, setExpandedStory] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setAppeared(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleStory = (id) => {
    setExpandedStory(expandedStory === id ? null : id);
  };

  const stories = [
    {
      id: 0,
      title: "The Keeper of Forgotten Stars",
      content: `In the hollow between worlds, where light bends like water around ancient stones, there lived a woman who collected the stars that mortals no longer wished upon.

She kept them in glass jars along her windowsill—some bright as fresh heartbreak, others dim as memories half-remembered. Each night, she would sit among them and listen to their whispered stories: of lovers who'd given up too soon, of children who'd stopped believing, of old men who'd forgotten how to dream.

"Every star," she would say to no one in particular, "is a promise someone couldn't keep."

One evening, a stranger arrived at her door. He was young, or perhaps ancient—it was difficult to tell in this place where time moved like honey. In his cupped hands, he held a star so bright it burned.

"I need you to keep this safe," he said. "It's the last hope of a dying world."

She looked at the star, then at him. "And what happens when they stop hoping entirely?"

He smiled, sad as moonlight. "Then you'll know what to do with it."

She took the star. It was heavier than she expected—heavy as grief, as love, as all the things worth carrying.`
    },
    {
      id: 1,
      title: "The Garden at the End of the Road",
      content: `There is a garden that exists only when you've given up looking for it.

Marguerite found it on a Tuesday, after the funeral, after the lawyers, after everyone had stopped bringing casseroles. She'd been walking—just walking, no destination, no purpose—when the road ended at a gate she'd never seen before.

The garden beyond was impossible. Roses bloomed alongside winter jasmine. Cherry trees dropped their blossoms into pools where lotus flowers opened to a sun that seemed gentler here, kinder somehow.

An old woman knelt among the beds, her hands deep in the dark earth.

"You're early," the woman said without turning. "They usually don't come until they've forgotten what they lost."

"I don't think I'll ever forget," Marguerite said.

"No." The woman stood, wiping her hands on her apron. "But you might learn to remember differently."

She handed Marguerite a seed—small, black, unremarkable.

"What is it?"

"Something new. Something that's never grown before." The woman's eyes were ancient, patient. "That's all any of us can offer, in the end. Something new from something lost."`
    },
    {
      id: 2,
      title: "The Cartographer's Daughter",
      content: `My father mapped the impossible.

While other cartographers charted coastlines and mountain ranges, my father drew the territories of dreams. His workshop was filled with maps of places that existed only in story: the forest where Hansel and Gretel wandered, the castle where Sleeping Beauty slept, the tower where a witch kept the sun.

"These places are real," he told me once, his compass steady over a drawing of the realm beyond the North Wind. "Just as real as Paris or London. They simply require a different kind of traveling to reach."

When he died, I inherited his maps—and his gift.

Now I sit in his chair, my own compass in hand, charting the paths that lead from one story to another. Last week, I discovered a shortcut between the Glass Mountain and the Singing Grove. Yesterday, I mapped the shadows beneath the Fairy Market, where bargains are made in whispers and paid for in years.

Someday, when my daughter is old enough, I will teach her to read these maps. I will show her how to find the doors hidden in stories, the passages written between lines.

For now, I draw. And the impossible unfolds before me, waiting to be explored.`
    },
    {
      id: 3,
      title: "What the River Remembers",
      content: `The river remembers everything.

It remembers the first rain that fell on a young world. It remembers the footprints of creatures that no longer have names. It remembers every stone it has smoothed, every shore it has shaped, every secret whispered to it by those who believed water could keep confidence.

Lena came to the river with her grandmother's ashes.

"She always said she wanted to return to the water," she explained, though the river needed no explanation. It had known her grandmother—remembered a young girl in a cotton dress, wading in the shallows, laughing at minnows.

"The water knows the way home," her grandmother used to say. "It always finds its way back to where it began."

Lena opened the urn. The ashes scattered across the current like a final sigh.

And the river remembered: the girl in the cotton dress, grown into a woman, grown old, grown wise, finally returning to where the water could carry her forward into whatever came next.

Some journeys, the river knew, only end so that others can begin.`
    }
  ];

  const hasExpanded = expandedStory !== null;

  return (
    <div style={{
      ...styles.wingContent,
      opacity: transitioning ? 0 : 1,
      background: 'transparent',
    }}>
      {/* Floating fireflies - magical dust motes */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${3 + Math.random() * 5}px`,
            height: `${3 + Math.random() * 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(200, 160, 80, 0.95) 0%, rgba(180, 140, 60, 0.5) 40%, transparent 70%)',
            borderRadius: '50%',
            boxShadow: `0 0 ${8 + Math.random() * 12}px rgba(200, 160, 80, 0.6)`,
            animation: `fireflyFloat ${6 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      {/* HEADER - fades when story expanded */}
      <div style={{
        ...styles.headerLine,
        opacity: hasExpanded ? 0.3 : 1,
        transition: 'opacity 0.6s ease',
      }}>
        <button style={{
          ...styles.headerBackButton,
          borderColor: 'rgba(120, 90, 50, 0.4)',
          color: 'rgba(90, 65, 35, 0.9)',
        }} onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 style={{
          ...styles.headerTitle,
          opacity: appeared ? 1 : 0,
          color: 'rgba(70, 50, 30, 0.85)',
          textShadow: '0 1px 3px rgba(255, 255, 255, 0.4)',
        }}>
          WRITING
        </h1>
        <div style={{ width: '40px' }} />
      </div>

      {/* CONTENT */}
      <div style={{
        ...styles.contentArea,
        overflowY: 'auto',
        padding: hasExpanded ? '1rem 2rem' : '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: hasExpanded ? 'center' : 'flex-start',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        transition: 'all 0.6s ease',
      }}>
        {stories.map((story, index) => {
          const isExpanded = expandedStory === story.id;
          const isOther = hasExpanded && !isExpanded;
          
          return (
            <div
              key={story.id}
              style={{
                width: '100%',
                marginBottom: isExpanded ? '0' : isOther ? '0.25rem' : '0.5rem',
                opacity: appeared ? 1 : 0,
                transform: appeared ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.6s ease ${index * 0.1}s`,
                order: isExpanded ? -1 : index,
              }}
            >
              {/* Title - clickable */}
              <div
                onClick={() => toggleStory(story.id)}
                style={{
                  cursor: 'pointer',
                  padding: isOther ? '0.3rem 0' : '1rem 0',
                  borderBottom: isExpanded ? 'none' : isOther ? 'none' : '1px solid rgba(140, 100, 60, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.5s ease',
                  justifyContent: isExpanded ? 'center' : 'flex-start',
                }}
              >
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: isExpanded 
                    ? 'clamp(1.6rem, 4vw, 2.4rem)' 
                    : isOther 
                      ? '0.7rem' 
                      : 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontStyle: 'italic',
                  fontWeight: isExpanded ? 400 : 400,
                  color: isExpanded 
                    ? 'rgba(70, 50, 30, 0.95)' 
                    : isOther 
                      ? 'rgba(140, 110, 70, 0.4)' 
                      : 'rgba(80, 55, 35, 0.85)',
                  letterSpacing: isExpanded ? '0.08em' : '0.02em',
                  transition: 'all 0.5s ease',
                  textAlign: isExpanded ? 'center' : 'left',
                }}>
                  {story.title}
                </span>
                {!isExpanded && !isOther && (
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.2rem',
                    color: 'rgba(160, 120, 70, 0.6)',
                    transition: 'all 0.3s ease',
                  }}>
                    →
                  </span>
                )}
              </div>

              {/* Story content - expands to take over */}
              <div style={{
                maxHeight: isExpanded ? '70vh' : '0',
                overflow: isExpanded ? 'auto' : 'hidden',
                transition: 'max-height 0.6s ease',
              }}>
                <div style={{
                  padding: '3rem 0 2rem 0',
                  maxWidth: '700px',
                  margin: '0 auto',
                }}>
                  {story.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                      lineHeight: 2.1,
                      color: 'rgba(55, 40, 25, 0.92)',
                      marginBottom: '1.8rem',
                      textIndent: pIndex === 0 ? '0' : '3rem',
                      textAlign: 'justify',
                    }}>
                      {paragraph}
                    </p>
                  ))}
                  <div style={{
                    textAlign: 'center',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1rem',
                    color: 'rgba(140, 100, 60, 0.4)',
                    fontStyle: 'italic',
                    marginTop: '3rem',
                    letterSpacing: '0.3em',
                  }}>
                    ✦
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// SHARED COMPONENTS
// ============================================
function MenuLink({ children, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onClick={onClick}
      style={{
        color: hovered ? '#f4efe4' : 'rgba(244, 239, 228, 0.85)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        letterSpacing: hovered ? '0.25em' : '0.18em',
        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </span>
  );
}

function StorytellerWord() {
  const [hovered, setHovered] = useState(false);
  return (
    <span style={{ display: 'inline-block', perspective: '800px' }}>
      <span
        style={{
          display: 'inline-block',
          fontSize: '1.15em',
          fontWeight: 600,
          color: '#3d3530',
          cursor: 'default',
          transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: hovered ? 'translateZ(80px) scale(1.06)' : 'translateZ(0) scale(1)',
          textShadow: hovered ? '0 6px 40px rgba(139, 90, 60, 0.4)' : '0 2px 10px rgba(139, 115, 85, 0.15)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Storyteller
      </span>
    </span>
  );
}

// ============================================
// STYLES
// ============================================
const styles = {
  // Page
  page: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    fontFamily: "'Playfair Display', Georgia, serif",
    overflowX: 'hidden',
  },
  creamBackdrop: {
    position: 'fixed',
    top: 0, left: 0, width: '100%', height: '100%',
    backgroundImage: `url(${IMAGES.creamBackdrop})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },

  // Candlelit Reveal
  candlelitOverlay: {
    position: 'fixed',
    top: 0, left: 0, width: '100%', height: '100%',
    zIndex: 1000,
    pointerEvents: 'none',
    transition: 'opacity 0.8s ease',
  },
  darkVeil: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    background: 'linear-gradient(180deg, #0a0806 0%, #12100e 50%, #0a0806 100%)',
    transition: 'opacity 1.5s ease',
  },
  warmGlow: {
    position: 'absolute',
    top: '50%', left: '50%',
    width: '100vmax',
    height: '100vmax',
    marginLeft: '-50vmax',
    marginTop: '-50vmax',
    background: 'radial-gradient(ellipse at center, rgba(255, 200, 120, 0.15) 0%, rgba(200, 140, 80, 0.08) 30%, transparent 60%)',
    transition: 'opacity 1s ease, transform 2s cubic-bezier(0.23, 1, 0.32, 1)',
  },
  candleFlicker: {
    position: 'absolute',
    top: '40%',
    width: '200px',
    height: '300px',
    background: 'radial-gradient(ellipse at center bottom, rgba(255, 180, 100, 0.2) 0%, rgba(200, 120, 60, 0.1) 40%, transparent 70%)',
    transition: 'opacity 0.8s ease, transform 1s ease',
  },

  // Menu
  menu: {
    position: 'fixed',
    top: '25px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
  },
  menuDot: {
    color: 'rgba(244, 239, 228, 0.4)',
    fontSize: '0.5rem',
  },

  // Hero
  heroSection: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    zIndex: 10,
  },
  heroImageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    display: 'block',
  },
  nameBlock: {
    position: 'absolute',
    right: '6%',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 20,
    textAlign: 'right',
    transition: 'opacity 1.5s ease, transform 1.5s ease',
  },
  firstName: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
    fontWeight: 500,
    letterSpacing: '0.06em',
    color: '#f4efe4',
    textShadow: '3px 3px 25px rgba(0, 0, 0, 0.5)',
    lineHeight: 1,
    margin: 0,
  },
  lastName: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
    fontWeight: 500,
    letterSpacing: '0.06em',
    color: '#f4efe4',
    textShadow: '3px 3px 25px rgba(0, 0, 0, 0.5)',
    lineHeight: 1,
    margin: 0,
  },
  titleBlock: { marginTop: '1rem' },
  titleLine: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
    fontWeight: 400,
    letterSpacing: '0.06em',
    color: '#e8dfd0',
    textShadow: '1px 1px 10px rgba(0, 0, 0, 0.5)',
    lineHeight: 1.8,
    margin: 0,
  },

  // Quote Section
  quoteSection: {
    position: 'relative',
    zIndex: 10,
    padding: '8vh 8vw 12vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
  },
  greenFade: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '70%',
    backgroundImage: `url(${IMAGES.greenBackdrop})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    zIndex: -1,
  },
  parchmentPaper: {
    position: 'relative',
    maxWidth: '700px',
    padding: '4rem 5rem',
    backgroundImage: `url(${IMAGES.parchment})`,
    backgroundColor: '#f5f0e6',
    backgroundSize: 'cover',
    boxShadow: '0 8px 40px rgba(0,0,0,0.15), 0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  quoteMark: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '5rem',
    color: '#8b5a5a',
    opacity: 0.35,
    position: 'absolute',
    top: '15px',
    left: '25px',
    lineHeight: 1,
    userSelect: 'none',
  },
  quoteText: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.9,
    color: '#3d3530',
    margin: 0,
  },
  quoteAttribution: {
    marginTop: '1.5rem',
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '0.85rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    color: '#5a4a40',
  },

  // About Section
  aboutSection: {
    position: 'relative',
    zIndex: 10,
    padding: '8vh 6vw 12vh',
  },
  aboutLayout: {
    display: 'flex',
    gap: 'clamp(3rem, 6vw, 6rem)',
    alignItems: 'flex-start',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  aboutTextSide: { flex: '1 1 55%', minWidth: '300px', maxWidth: '600px' },
  aboutPhotoSide: { flex: '1 1 35%', minWidth: '250px', maxWidth: '400px' },
  aboutLabel: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: '#8b7355',
    marginBottom: '2rem',
  },
  photoFrame: {
    aspectRatio: '3/4',
    background: 'rgba(0,0,0,0.08)',
    border: '1px solid rgba(139, 115, 85, 0.2)',
    boxShadow: '0 4px 40px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  aboutPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  aboutOpening: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.1rem',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.9,
    color: '#5a4a40',
    marginBottom: '1.5rem',
  },
  aboutHeadline: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
    fontWeight: 500,
    lineHeight: 1.5,
    color: '#3d3530',
    margin: 0,
  },
  aboutSubsection: { marginTop: '2rem' },
  curiousText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1rem',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.8,
    color: '#7a6a5a',
  },
  clickReveal: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.05rem',
    fontWeight: 500,
    color: '#5a4a40',
    marginTop: '1.2rem',
    cursor: 'pointer',
    textDecoration: 'underline',
    textDecorationColor: '#8b5a5a',
    textUnderlineOffset: '4px',
  },
  bioExpanded: {
    overflow: 'hidden',
    transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
  },
  bioContent: {
    paddingTop: '1.2rem',
    borderTop: '1px solid rgba(139, 90, 90, 0.2)',
  },
  bioParagraph: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.9,
    color: '#5a4a40',
    marginBottom: '1.2rem',
  },
  closeReveal: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.05rem',
    fontWeight: 500,
    color: '#5a4a40',
    marginTop: '1.5rem',
    cursor: 'pointer',
    textDecoration: 'underline',
    textDecorationColor: '#8b5a5a',
    textUnderlineOffset: '4px',
  },

  // Rotunda
  rotunda: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '4vh',
    paddingBottom: '2vh',
    paddingLeft: '5vw',
    paddingRight: '5vw',
    zIndex: 10,
    overflow: 'hidden',
  },
  rotundaBackground: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    transition: 'opacity 0.8s ease',
    zIndex: 0,
  },
  rotundaContent: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 4,
  },
  fireTexture: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    background: `
      radial-gradient(ellipse 80% 50% at 20% 80%, rgba(139, 58, 40, 0.12) 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at 80% 20%, rgba(180, 100, 60, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse 100% 60% at 50% 100%, rgba(100, 40, 30, 0.1) 0%, transparent 40%)
    `,
    pointerEvents: 'none',
    zIndex: 1,
    transition: 'opacity 0.8s ease',
  },
  rotundaLabel: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.5em',
    textTransform: 'uppercase',
    color: '#8b7d6b',
    marginBottom: '1.5rem',
    zIndex: 2,
    transition: 'opacity 0.3s ease',
  },
  doorways: {
    display: 'flex',
    gap: 'clamp(2rem, 5vw, 5rem)',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '1100px',
    perspective: '1000px',
  },
  doorway: {
    flex: '1 1 260px',
    maxWidth: '320px',
    minHeight: '420px',
    position: 'relative',
  },
  doorArch: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    border: '1px solid rgba(244, 239, 228, 0.15)',
    borderRadius: '50% 50% 0 0 / 25% 25% 0 0',
    overflow: 'hidden',
    transition: 'border-color 0.5s ease',
  },
  doorGlow: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    transition: 'opacity 0.5s ease',
  },
  doorLight: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '1px',
    background: 'linear-gradient(to top, #d4c9b5, transparent)',
    transition: 'opacity 0.4s ease, height 0.4s ease',
  },
  doorContent: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: '2.5rem 1.5rem',
    textAlign: 'center',
    background: 'linear-gradient(to top, rgba(15, 13, 10, 0.98) 0%, rgba(15, 13, 10, 0.7) 60%, transparent 100%)',
  },
  doorTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
    fontWeight: 500,
    letterSpacing: '0.15em',
    color: '#f4efe4',
    marginBottom: '0.6rem',
    transition: 'letter-spacing 0.4s ease',
  },
  doorWhisper: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.85rem',
    fontWeight: 400,
    fontStyle: 'italic',
    color: '#d4c9b5',
  },

  // Back button
  backButton: {
    position: 'absolute',
    top: '30px',
    left: '30px',
    zIndex: 100,
    background: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(244, 239, 228, 0.3)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'rgba(244, 239, 228, 0.7)',
    transition: 'all 0.3s ease',
  },

  // Wing content - positioned in same space as doors
  wingContent: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    transition: 'opacity 0.3s ease',
  },
  
  // CONSISTENT HEADER BAR - back button + title always at same position
  headerLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: '1200px',
    padding: '0',
    marginBottom: '1rem',
  },
  headerBackButton: {
    background: 'transparent',
    // Subtle gold tint on border
    border: '1px solid rgba(212, 175, 55, 0.2)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'rgba(244, 239, 228, 0.7)',
    transition: 'all 0.3s ease',
  },
  headerTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
    fontWeight: 500,
    letterSpacing: '0.2em',
    margin: 0,
    transition: 'opacity 0.4s ease',
    textAlign: 'center',
    // Subtle gold highlight
    textShadow: '0 0 30px rgba(212, 175, 55, 0.15)',
  },
  headerSpacer: {
    width: '40px',
  },
  contentArea: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  
  wingTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    fontWeight: 500,
    letterSpacing: '0.25em',
    color: '#e8dfd0',
    textShadow: '0 2px 20px rgba(0,0,0,0.4)',
    margin: 0,
    transition: 'all 0.4s ease',
  },
  descendingLine: {
    width: '1px',
    background: 'linear-gradient(to bottom, transparent, rgba(244, 239, 228, 0.4), transparent)',
    margin: '1rem 0',
    transition: 'height 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  },

  // Choice container for Reels/Galleries/VoiceOver
  choiceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    transition: 'transform 0.5s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.3s ease',
  },

  // Glass panes - same size as expanded Reels/Galleries content
  glassContainer: {
    position: 'relative',
    width: '90%',
    maxWidth: '1200px',
    height: '55vh',
    display: 'flex',
    overflow: 'hidden',
  },
  // Content layer - sits behind the glass, always visible
  contentUnderneath: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    display: 'flex',
    zIndex: 1,
  },
  halfContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
  },
  // Glass overlay that sits on top and slides away
  glassOverlayContainer: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    display: 'flex',
    zIndex: 10,
    overflow: 'hidden',
  },
  dividingLine: {
    position: 'absolute',
    top: '15%',
    left: '50%',
    transform: 'translateX(-50%)',
    height: '70%',
    width: '1px',
    // Gold accent
    background: 'linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.25), transparent)',
    zIndex: 20,
    transition: 'opacity 0.5s ease',
  },
  glassPane: {
    position: 'relative',
    flex: '1 0 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
    background: 'transparent',
  },
  // Glass frost - matches lighter auburn backdrop
  glassFrost: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    // Match the acting wing lighter auburn backdrop
    background: 'linear-gradient(180deg, rgba(75, 45, 45, 0.95) 0%, rgba(55, 32, 32, 0.98) 50%, rgba(40, 25, 25, 1) 100%)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  
  // REAL CONTENT styles - Reels bars and Gallery cards
  reelsContentContainer: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    height: '100%',
    padding: '0 0.5rem',
  },
  reelBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(244, 239, 228, 0.03)',
    overflow: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  },
  reelBarLabel: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reelBarText: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 500,
    letterSpacing: '0.12em',
    color: 'rgba(244, 239, 228, 0.6)',
    transition: 'all 0.4s ease',
  },
  galleriesContentContainer: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    height: '100%',
    padding: '1rem',
    overflowX: 'auto',
  },
  galleryCard: {
    flex: '0 0 280px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(244, 239, 228, 0.03)',
    transition: 'all 0.4s ease',
  },
  galleryCardImage: {
    flex: '1 1 70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(244, 239, 228, 0.02)',
  },
  galleryCardPlaceholder: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.8rem',
    color: 'rgba(244, 239, 228, 0.2)',
    fontStyle: 'italic',
  },
  galleryCardText: {
    padding: '1rem',
  },
  galleryCardTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '0.95rem',
    fontWeight: 500,
    color: 'rgba(244, 239, 228, 0.8)',
    margin: 0,
    // Subtle gold accent
    textShadow: '0 0 20px rgba(212, 175, 55, 0.1)',
  },
  galleryCardRole: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.8rem',
    color: 'rgba(212, 175, 55, 0.5)',
    fontStyle: 'italic',
    margin: '0.3rem 0 0',
  },

  // Trapdoor for Voice Over
  trapdoorPane: {
    position: 'relative',
    marginTop: '1.5vh',
    padding: '1rem 2rem',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.6s ease',
  },
  trapdoorGlow: {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '180px',
    height: '60px',
    // Gold-tinted glow
    background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },
  trapdoorLabel: {
    position: 'relative',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.95rem',
    fontWeight: 400,
    fontStyle: 'italic',
    // Muted with hint of gold
    color: 'rgba(212, 175, 55, 0.6)',
    margin: 0,
    transition: 'all 0.4s ease',
  },
  trapdoorHint: {
    position: 'relative',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.1rem',
    // Gold accent
    color: 'rgba(212, 175, 55, 0.5)',
    marginTop: '0.3rem',
    transition: 'all 0.4s ease',
  },
  paneTitle: {
    position: 'relative',
    zIndex: 10,
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
    fontWeight: 500,
    fontStyle: 'italic',
    letterSpacing: '0.15em',
    color: '#f4efe4',
    // Default gold highlight
    textShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
    transition: 'text-shadow 0.4s ease',
  },

  // Video container for expanded reels
  videoContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
  },
  videoIframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },

  // Galleries styling
  galleriesContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  horizontalScroll: {
    display: 'flex',
    gap: '4rem',
    width: '100%',
    overflowX: 'auto',
    padding: '4vh 6vw',
    scrollSnapType: 'x mandatory',
  },
  galleryItem: {
    display: 'flex',
    gap: '2rem',
    minWidth: '80vw',
    maxWidth: '900px',
    scrollSnapAlign: 'center',
    transition: 'all 0.6s ease',
  },
  galleryImageContainer: {
    flex: '0 0 50%',
  },
  galleryImagePlaceholder: {
    width: '100%',
    aspectRatio: '4/5',
    background: 'rgba(244, 239, 228, 0.03)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.9rem',
    fontStyle: 'italic',
    color: 'rgba(244, 239, 228, 0.25)',
    letterSpacing: '0.2em',
  },
  galleryTextContainer: {
    flex: '0 0 45%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: '2rem',
  },
  galleryTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 500,
    color: '#f4efe4',
    marginBottom: '0.5rem',
  },
  galleryRole: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1rem',
    fontStyle: 'italic',
    color: '#c4a35a',
    letterSpacing: '0.1em',
    marginBottom: '1.5rem',
  },
  galleryDescription: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.05rem',
    lineHeight: 1.8,
    color: '#d4c9b5',
  },
  scrollHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'rgba(244, 239, 228, 0.3)',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.85rem',
    fontStyle: 'italic',
    marginTop: '2vh',
  },
  localBackButton: {
    position: 'absolute',
    bottom: '30px',
    left: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'transparent',
    border: 'none',
    color: 'rgba(244, 239, 228, 0.5)',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.9rem',
    cursor: 'pointer',
  },

  // Voice over - trapdoor experience
  voiceOverContainer: {
    position: 'relative',
    width: '100%',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '4vh',
  },
  voiceOverTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 500,
    letterSpacing: '0.25em',
    color: '#d4b0b8',
    textShadow: '0 0 60px rgba(180, 120, 140, 0.4), 0 0 120px rgba(100, 60, 80, 0.2)',
    margin: 0,
    transition: 'all 0.8s ease',
  },
  voidAtmosphere: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    background: `
      radial-gradient(ellipse at 50% 30%, rgba(80, 40, 60, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 70%, rgba(60, 30, 50, 0.1) 0%, transparent 40%),
      radial-gradient(ellipse at 70% 60%, rgba(100, 50, 70, 0.08) 0%, transparent 45%)
    `,
    pointerEvents: 'none',
  },
  whisperText: {
    position: 'absolute',
    top: '30%',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.1rem',
    fontStyle: 'italic',
    color: 'rgba(212, 176, 184, 0.6)',
    letterSpacing: '0.3em',
    transition: 'all 1.5s ease',
  },
  voiceDescription: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.3rem',
    fontStyle: 'italic',
    color: 'rgba(244, 239, 228, 0.5)',
    marginTop: '1.5rem',
    letterSpacing: '0.2em',
    transition: 'opacity 1s ease 0.3s',
  },
  audioSamplesArea: {
    marginTop: '4rem',
    transition: 'opacity 1s ease',
  },
  comingSoon: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.95rem',
    color: 'rgba(244, 239, 228, 0.25)',
    fontStyle: 'italic',
  },

  // ==========================================
  // MODELING WING STYLES - Soft summer light
  // ==========================================
  modelingSectionTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    fontWeight: 400,
    fontStyle: 'italic',
    letterSpacing: '0.2em',
    color: 'rgba(80, 60, 70, 0.85)',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  
  // Comp Card Layout - TRUE HORIZONTAL like a model card
  compCardLayout: {
    display: 'flex',
    gap: '1.5rem',
    width: '100%',
    height: '65vh',
    minHeight: '400px',
    maxHeight: '600px',
  },
  compHeadshot: {
    flex: '0 0 50%',
    height: '100%',
  },
  compSideGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '0.75rem',
    height: '100%',
  },
  compSidePhoto: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  digitalPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'rgba(60, 50, 55, 0.15)',
    border: '1px dashed rgba(80, 60, 70, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  digitalPlaceholderLarge: {
    width: '100%',
    height: '100%',
    background: 'rgba(60, 50, 55, 0.18)',
    border: '1px dashed rgba(80, 60, 70, 0.35)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  digitalLabel: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    color: 'rgba(60, 45, 55, 0.8)',
    textAlign: 'center',
  },
  digitalFilename: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '0.65rem',
    fontStyle: 'italic',
    color: 'rgba(80, 60, 70, 0.6)',
  },
  
  // Gallery Buttons
  galleryButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  galleryButton: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '1rem',
    fontStyle: 'italic',
    letterSpacing: '0.1em',
    color: 'rgba(60, 45, 55, 0.9)',
    background: 'rgba(60, 50, 55, 0.08)',
    border: '1px solid rgba(80, 60, 70, 0.25)',
    padding: '0.75rem 2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  
  // Flowing Gallery Layout - fills space horizontally - WIDE
  flowingGallery: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
  },
  runwayVideoFeature: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    aspectRatio: '16/9',
  },
  runwayVideoPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'rgba(60, 50, 55, 0.12)',
    border: '1px dashed rgba(80, 60, 70, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  flowingPhotos: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    justifyContent: 'center',
  },
  flowingPhoto: {
    flex: '1 1 180px',
    maxWidth: '250px',
    aspectRatio: '4/5',
  },
  galleryPhotoPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'rgba(60, 50, 55, 0.1)',
    border: '1px dashed rgba(80, 60, 70, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Masonry Gallery - Commercial (bright, varied sizes)
  masonryGallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gridAutoRows: '150px',
    gap: '1.5rem',
    width: '100%',
  },
  masonryPhoto: {
    overflow: 'hidden',
  },
  
  // Cinematic Gallery - Editorial (horizontal, moody)
  cinematicGallery: {
    display: 'flex',
    gap: '1.5rem',
    overflowX: 'auto',
    paddingBottom: '1rem',
    width: '100%',
  },
  cinematicPhoto: {
    flex: '0 0 280px',
    aspectRatio: '3/4',
  },

  // ==========================================
  // WRITING WING STYLES - Fairy Jungle Sunrise
  // ==========================================
  
  // Floating fireflies
  firefliesContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 1,
  },
  firefly: {
    position: 'absolute',
    width: '6px',
    height: '6px',
    background: 'radial-gradient(circle, rgba(255, 255, 200, 0.9) 0%, rgba(255, 220, 100, 0.6) 50%, transparent 100%)',
    borderRadius: '50%',
    animation: 'fireflyFloat 5s ease-in-out infinite',
    boxShadow: '0 0 10px rgba(255, 220, 100, 0.8), 0 0 20px rgba(255, 200, 80, 0.4)',
  },
  
  // Sun rays
  sunRays: {
    position: 'absolute',
    top: '-20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '150%',
    height: '60%',
    background: `
      conic-gradient(
        from 180deg at 50% 100%,
        transparent 0deg,
        rgba(255, 220, 120, 0.15) 10deg,
        transparent 20deg,
        rgba(255, 200, 100, 0.1) 30deg,
        transparent 40deg,
        rgba(255, 230, 140, 0.12) 50deg,
        transparent 60deg,
        rgba(255, 210, 110, 0.08) 70deg,
        transparent 80deg,
        rgba(255, 220, 120, 0.1) 90deg,
        transparent 100deg,
        rgba(255, 200, 100, 0.12) 110deg,
        transparent 120deg,
        rgba(255, 230, 140, 0.08) 130deg,
        transparent 140deg,
        rgba(255, 210, 110, 0.1) 150deg,
        transparent 160deg,
        rgba(255, 220, 120, 0.12) 170deg,
        transparent 180deg
      )
    `,
    pointerEvents: 'none',
    opacity: 0.8,
  },
  
  // Story card - glass morphism with nature feel
  storyCard: {
    width: '100%',
    maxWidth: '800px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 2,
  },
  
  // Title bar
  storyTitleBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem 1.5rem',
    transition: 'background 0.3s ease',
    minHeight: '80px',
  },
  storyIcon: {
    fontSize: '1.8rem',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    flexShrink: 0,
  },
  storyTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
    fontWeight: 500,
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.95)',
    margin: 0,
    flex: 1,
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    letterSpacing: '0.02em',
  },
  expandIcon: {
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.7)',
    transition: 'transform 0.4s ease',
    flexShrink: 0,
  },
  
  // Story content wrapper
  storyContentWrapper: {
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.08)',
  },
  storyScrollArea: {
    maxHeight: '55vh',
    overflowY: 'auto',
  },
  
  // Fairy tale paragraph style
  fairyParagraph: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
    lineHeight: 2,
    color: 'rgba(255, 255, 255, 0.92)',
    marginBottom: '1.5rem',
    textIndent: '2rem',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
  },
  storyEnd: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: '2rem',
    letterSpacing: '0.5em',
  },
};

// ============================================
// KEYFRAMES
// ============================================
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes drift {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(30px, -20px) rotate(5deg); }
    }
    @keyframes drift2 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(-20px, 30px) rotate(-3deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fireflyFloat {
      0%, 100% { 
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
      }
      25% {
        transform: translate(15px, -25px) scale(1.2);
        opacity: 1;
      }
      50% { 
        transform: translate(-10px, -40px) scale(0.8);
        opacity: 0.6;
      }
      75% {
        transform: translate(20px, -20px) scale(1.1);
        opacity: 0.9;
      }
    }
    @keyframes soundWave {
      0% { 
        transform: scaleY(0.4);
        opacity: 0.4;
      }
      100% { 
        transform: scaleY(1.2);
        opacity: 1;
      }
    }
    @keyframes waveFloat {
      0%, 100% { 
        transform: translateX(0);
        opacity: 0.3;
      }
      50% { 
        transform: translateX(10px);
        opacity: 0.6;
      }
    }
    @keyframes vineGrow {
      0% {
        stroke-dashoffset: 1000;
        opacity: 0;
      }
      30% {
        opacity: 0.6;
      }
      100% {
        stroke-dashoffset: 0;
        opacity: 1;
      }
    }
    @keyframes vineCreep {
      0%, 100% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(3px, -2px);
      }
    }
    @keyframes emberGlow {
      0%, 100% {
        opacity: 0.5;
        filter: brightness(1);
      }
      50% {
        opacity: 1;
        filter: brightness(1.5);
      }
    }
    @keyframes emberFloat {
      0%, 100% {
        transform: translate(0, 0);
        opacity: 0.4;
      }
      25% {
        transform: translate(10px, -15px);
        opacity: 0.9;
      }
      50% {
        transform: translate(-5px, -30px);
        opacity: 0.6;
      }
      75% {
        transform: translate(8px, -20px);
        opacity: 0.8;
      }
    }
    @keyframes berryPulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.3);
        opacity: 0.8;
      }
    }
    @keyframes hexUnfold {
      0% {
        stroke-dashoffset: 300;
        opacity: 0;
      }
      100% {
        stroke-dashoffset: 0;
        opacity: 1;
      }
    }
    @keyframes hexPulse {
      0%, 100% {
        opacity: 0.3;
      }
      50% {
        opacity: 0.5;
      }
    }
    @keyframes dustFloat {
      0% {
        transform: translate(0, 0) scale(0.8);
        opacity: 0;
      }
      20% {
        opacity: 0.8;
      }
      80% {
        opacity: 0.6;
      }
      100% {
        transform: translate(var(--drift-x, 20px), var(--drift-y, -40px)) scale(1.2);
        opacity: 0;
      }
    }
    @keyframes inkDraw {
      0% {
        stroke-dashoffset: 900;
        opacity: 0;
      }
      10% {
        opacity: 0.4;
      }
      100% {
        stroke-dashoffset: 0;
        opacity: 0.4;
      }
    }
    @keyframes berryPulse {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      20% {
        transform: scale(1.2);
        opacity: 0.6;
      }
      40%, 100% {
        transform: scale(1);
        opacity: 0.5;
      }
    }
    @keyframes rippleOut {
      0% {
        transform: scale(1);
        opacity: 0.4;
      }
      100% {
        transform: scale(3);
        opacity: 0;
      }
    }
    *::-webkit-scrollbar { display: none; }
    * { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(style);
}
