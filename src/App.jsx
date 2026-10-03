import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarCheck, MoreHorizontal, Check, Camera, Music, MapPin,
  PlusCircle, ListPlus, BarChart2, GlassWater, Quote, ChevronDown,
  X, Menu, ChevronUp
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  out: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// --- SHARED COMPONENTS ---
const Navbar = ({ onContactClick }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`nav-wrapper ${isSticky ? 'sticky' : ''}`}>
      <div className="container">
        <nav>
          <Link to="/" className="logo">
            <CalendarCheck size={28} />
            Eventra
          </Link>
          
          <div className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`} style={mobileOpen ? {display: 'flex', flexDirection: 'column', position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', padding: '2rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'} : {}}>
            <Link to="/" onClick={() => setMobileOpen(false)} className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/features" onClick={() => setMobileOpen(false)} className={location.pathname === '/features' ? 'active' : ''}>Features</Link>
            <Link to="/process" onClick={() => setMobileOpen(false)} className={location.pathname === '/process' ? 'active' : ''}>Process</Link>
            <Link to="/testimonials" onClick={() => setMobileOpen(false)} className={location.pathname === '/testimonials' ? 'active' : ''}>Testimonials</Link>
            <Link to="/faq" onClick={() => setMobileOpen(false)} className={location.pathname === '/faq' ? 'active' : ''}>FAQ</Link>
          </div>

          <div className="nav-actions" style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={28}/> : <Menu size={28}/>}
            </button>
            <Link to="/" className="btn btn-primary" style={{padding: '0.75rem 1.5rem', fontSize: '1rem'}}>Start Planning</Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

const Footer = ({ onContactClick }) => (
  <footer>
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" style={{color: 'white', marginBottom: '1rem'}}>
            <CalendarCheck size={24} />
            Eventra
          </Link>
          <p style={{color: '#9CA3AF', maxWidth: '300px'}}>Transforming event planning from chaotic to calm. Your single source of truth for every gathering.</p>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/process">Process</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }}>Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>&copy; {new Date().getFullYear()} Eventra. All rights reserved.</div>
        <div className="social-links">
          <a href="#" aria-label="Twitter">TW</a>
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Facebook">FB</a>
        </div>
      </div>
    </div>
  </footer>
);

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} style={{opacity: 1, pointerEvents: 'auto'}}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="modal-content" onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        <h3 style={{marginBottom: '1.5rem', fontSize: '1.5rem'}}>Get in Touch</h3>
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea className="form-control" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '0.5rem'}}>Send Message</button>
        </form>
      </motion.div>
    </div>
  );
};

const CTA = () => (
  <section className="cta-section">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="container cta-content"
    >
      <h2>Your event deserves a better plan.</h2>
      <p>Ditch the chaos. Start planning with clarity and confidence today.</p>
      <Link to="/" className="btn btn-primary" style={{fontSize: '1.25rem', padding: '1.25rem 3rem'}}>Start Planning for Free</Link>
    </motion.div>
  </section>
);


const HeroSection = () => (
  <section className="hero">
    <div className="container hero-content">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-text"
      >
        <span className="eyebrow">EVENT PLANNING, WITHOUT THE CHAOS</span>
        <h1>
          Everything your event needs. <br />
          <span className="accent-underline">All in one place.</span>
        </h1>
        <p>
          Stop juggling spreadsheets, sticky notes, and endless email threads. Eventra gives you a calm, central workspace to manage tasks, track your budget, coordinate vendors, and organize your guests. Plan the moment, then actually enjoy the day.
        </p>
        <Link to="/features" className="btn btn-primary">Discover Features</Link>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50, rotateY: 15 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hero-visual"
      >
        <div className="ui-mockup-wrapper">
          <div className="ui-mockup">
            <div className="ui-header">
              <div className="ui-title">Sarah & John's Wedding</div>
              <MoreHorizontal size={20} />
            </div>
            <div className="ui-grid">
              <div className="ui-card">
                <div className="ui-card-title">Budget</div>
                <div className="ui-value">$24,500</div>
                <div className="ui-progress-bar">
                  <div className="ui-progress-fill" style={{width: '65%'}}></div>
                </div>
              </div>
              <div className="ui-card">
                <div className="ui-card-title">Guests</div>
                <div className="ui-value">124 / 150</div>
                <div className="ui-progress-bar">
                  <div className="ui-progress-fill" style={{width: '82%', background: 'var(--ui-highlight)'}}></div>
                </div>
              </div>
            </div>
            <div className="ui-card" style={{marginTop: '0.5rem'}}>
              <div className="ui-card-title" style={{marginBottom: '1rem'}}>Upcoming Tasks</div>
              <div className="ui-task">
                <div className="ui-checkbox checked">
                  <Check size={14} />
                </div>
                <div className="ui-task-text" style={{textDecoration: 'line-through', color: '#888'}}>Book Photographer</div>
              </div>
              <div className="ui-task">
                <div className="ui-checkbox"></div>
                <div className="ui-task-text">Finalize Catering Menu</div>
              </div>
              <div className="ui-task">
                <div className="ui-checkbox"></div>
                <div className="ui-task-text">Send out Invitations</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="features">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-header">
        <h2>A smarter way to plan any event.</h2>
        <p style={{color: 'var(--muted)', fontSize: '1.125rem'}}>Everything you need to orchestrate the perfect day, neatly organized in one intuitive dashboard.</p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="feature-row">
        <motion.div variants={fadeUpItem} className="feature-text">
          <h3>Go from overwhelmed to organized.</h3>
          <p>Break down your event into manageable tasks, assign deadlines, and see your progress at a glance. Eventra’s smart checklists keep you on track, so nothing falls through the cracks.</p>
        </motion.div>
        <motion.div variants={fadeUpItem} className="feature-visual">
          <div className="mockup-kanban">
            <div className="kanban-col">
              <div className="kanban-header">
                <span>To Do</span>
                <span style={{color: '#888'}}>3</span>
              </div>
              <div className="kanban-card">Order table linens</div>
              <div className="kanban-card">Confirm DJ playlist</div>
              <div className="kanban-card">Buy favors</div>
            </div>
            <div className="kanban-col">
              <div className="kanban-header">
                <span>In Progress</span>
                <span style={{color: '#888'}}>2</span>
              </div>
              <div className="kanban-card" style={{borderLeftColor: 'var(--ui-highlight)'}}>Draft seating chart</div>
              <div className="kanban-card" style={{borderLeftColor: 'var(--ui-highlight)'}}>Review catering contract</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="feature-row reverse">
        <motion.div variants={fadeUpItem} className="feature-text">
          <h3>Spend confidently, not carelessly.</h3>
          <p>Set your total budget, track every expense by category, and always know how much you have left. Get alerts when you’re approaching limits and make informed decisions without the guesswork.</p>
        </motion.div>
        <motion.div variants={fadeUpItem} className="feature-visual">
          <div className="mockup-budget">
            <div className="donut-chart">
              <div className="donut-inner">
                <span className="donut-value">$15,200</span>
                <span className="donut-label">Spent of $25K</span>
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '1rem'}}>
              <div>
                <div style={{fontSize: '0.75rem', color: '#888'}}>Remaining</div>
                <div style={{fontWeight: '800'}}>$9,800</div>
              </div>
              <div>
                <div style={{fontSize: '0.75rem', color: '#888'}}>Total Budget</div>
                <div style={{fontWeight: '800'}}>$25,000</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="feature-row">
        <motion.div variants={fadeUpItem} className="feature-text">
          <h3>All your contacts, contracts, and payments in one place.</h3>
          <p>Keep a directory of every vendor, from the venue to the florist. Track booking status, payment schedules, and contact details so you have the right information the moment you need it.</p>
        </motion.div>
        <motion.div variants={fadeUpItem} className="feature-visual">
          <div className="mockup-vendors" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
            <div className="vendor-card">
              <div className="vendor-header" style={{display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem'}}>
                <Camera size={20} color="var(--ui-primary)" />
                <span style={{fontSize:'0.7rem', padding: '0.2rem 0.5rem', background: '#e0f2e9', color: 'var(--ui-primary)', borderRadius: '8px', fontWeight: 'bold'}}>Booked</span>
              </div>
              <div className="vendor-info">
                <h4 style={{fontSize: '0.9rem', marginBottom: '0.25rem'}}>Lumina Photography</h4>
                <p style={{fontSize: '0.75rem', color: '#666'}}>Balance: $1,200</p>
              </div>
            </div>
            <div className="vendor-card">
              <div className="vendor-header" style={{display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem'}}>
                <Music size={20} color="var(--ui-highlight)" />
                <span style={{fontSize:'0.7rem', padding: '0.2rem 0.5rem', background: '#ffe8cc', color: 'var(--ui-highlight)', borderRadius: '8px', fontWeight: 'bold'}}>Pending</span>
              </div>
              <div className="vendor-info">
                <h4 style={{fontSize: '0.9rem', marginBottom: '0.25rem'}}>Rhythm DJs</h4>
                <p style={{fontSize: '0.75rem', color: '#666'}}>Awaiting Contract</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="process">
    <div className="container">
      <div className="section-header">
        <h2>Your perfect event, in four simple steps.</h2>
        <p style={{color: 'var(--muted)', fontSize: '1.125rem'}}>A clear path from scattered ideas to a flawlessly executed day.</p>
      </div>
      
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="process-timeline">
        <motion.div variants={fadeUpItem} className="step-card">
          <div className="step-number">1</div>
          <div className="step-icon"><PlusCircle size={36} /></div>
          <h4>Create Your Event</h4>
          <p>Tell Eventra what you're planning—a wedding, conference, or birthday—and set your initial goals.</p>
        </motion.div>
        <motion.div variants={fadeUpItem} className="step-card">
          <div className="step-number">2</div>
          <div className="step-icon"><ListPlus size={36} /></div>
          <h4>Add Your Details</h4>
          <p>Easily import guests, add your budget, list vendors, and start populating your task list.</p>
        </motion.div>
        <motion.div variants={fadeUpItem} className="step-card">
          <div className="step-number">3</div>
          <div className="step-icon"><BarChart2 size={36} /></div>
          <h4>Track Everything</h4>
          <p>Watch your plan come together as you complete tasks, log expenses, and receive RSVPs.</p>
        </motion.div>
        <motion.div variants={fadeUpItem} className="step-card">
          <div className="step-number">4</div>
          <div className="step-icon"><GlassWater size={36} /></div>
          <h4>Enjoy the Day</h4>
          <p>Walk into your event feeling prepared, confident, and ready to be present for the moment.</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="testimonials">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-header">
        <h2>Planners love the peace of mind.</h2>
        <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '1.125rem'}}>Join thousands who have traded chaos for calm.</p>
      </motion.div>
      
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="testimonial-grid">
        <motion.div variants={fadeUpItem} className="testimonial-card">
          <div className="quote-icon"><Quote size={32} /></div>
          <p className="testimonial-quote">"Eventra's budget tracker was a lifesaver for our annual conference. We came in under budget for the first time ever because we could see exactly where every dollar was going in real-time."</p>
          <div className="testimonial-author">Chiamaka E.</div>
          <div style={{color: 'var(--muted)', fontSize: '0.875rem'}}>Corporate Event Lead</div>
        </motion.div>
        <motion.div variants={fadeUpItem} className="testimonial-card">
          <div className="quote-icon"><Quote size={32} /></div>
          <p className="testimonial-quote">"Planning our wedding felt so overwhelming until we found Eventra. It turned a mountain of tasks into a clear, step-by-step plan. I honestly felt less stressed and more excited."</p>
          <div className="testimonial-author">Daniel O.</div>
          <div style={{color: 'var(--muted)', fontSize: '0.875rem'}}>Groom-to-be</div>
        </motion.div>
        <motion.div variants={fadeUpItem} className="testimonial-card">
          <div className="quote-icon"><Quote size={32} /></div>
          <p className="testimonial-quote">"As a freelance planner, I use Eventra for all my clients. The vendor and guest list tools save me hours of admin work, letting me focus on the creative details that matter."</p>
          <div className="testimonial-author">Fatima S.</div>
          <div style={{color: 'var(--muted)', fontSize: '0.875rem'}}>Freelance Event Planner</div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqs = [
    {
      q: "What types of events can I plan with Eventra?",
      a: "Eventra is designed for everything from weddings, birthdays, and anniversaries to corporate events, conferences, and private parties. You can customize it to fit any occasion."
    },
    {
      q: "Is Eventra free to use?",
      a: "Yes, you can start planning your first event for free to access all our core features. We offer premium plans for those managing multiple events or needing advanced collaboration tools."
    },
    {
      q: "Can I collaborate with my partner, team, or a co-planner?",
      a: "Absolutely. Our paid plans are built for collaboration, allowing you to share access, assign tasks, and plan together in one central workspace."
    },
    {
      q: "How does Eventra protect my data?",
      a: "We take your privacy and data security seriously. All your event information is encrypted and securely stored. We never share your personal data."
    },
    {
      q: "Is it hard to get started?",
      a: "Not at all. Our guided onboarding will help you set up your event's foundation—type, date, budget—in just a few minutes. You'll be ready to start planning right away."
    }
  ];

  return (
    <section className="faq">
      <div className="container">
        <div className="section-header">
          <h2>Your questions, answered.</h2>
        </div>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div variants={fadeUpItem} key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <div 
                className="faq-question" 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                {faq.q}
                <div className="faq-icon"><ChevronDown size={24} /></div>
              </div>
              <div className="faq-answer">
                <p style={{paddingTop: '0.5rem'}}>{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- PAGES ---

const Home = () => (
  <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="page-content" style={{paddingTop: 0}}>
    <HeroSection />
    <FeaturesSection />
    <ProcessSection />
    <TestimonialsSection />
    <CTA />
  </motion.div>
);

const Features = () => (
  <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="page-content">
    <div style={{padding: '6rem 0 2rem', textAlign: 'center'}}>
      <h1 style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)'}}>Deep Dive into Features</h1>
      <p style={{color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto', fontSize: '1.25rem'}}>Explore everything Eventra has to offer to make your event planning seamless and stress-free.</p>
    </div>
    <FeaturesSection />
    
    {/* Extended Features Content */}
    <section className="container" style={{padding: '4rem 0 8rem'}}>
      <div style={{background: 'var(--primary)', color: 'white', padding: '4rem', borderRadius: 'var(--radius)', display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
        <div>
          <h2 style={{color: 'white', marginBottom: '1rem', fontSize: '2rem'}}>Advanced Collaboration</h2>
          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem'}}>Invite co-planners, share specific vendor lists, and set granular permissions. With real-time syncing, your entire team stays on the exact same page.</p>
          <ul style={{marginTop: '1.5rem', marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
             <li>Real-time chat on specific tasks</li>
             <li>Activity logs and version history</li>
             <li>Vendor contract redlining & approvals</li>
          </ul>
        </div>
        <div>
          <h2 style={{color: 'white', marginBottom: '1rem', fontSize: '2rem'}}>Custom Reporting</h2>
          <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem'}}>Generate beautiful PDF reports for your clients or stakeholders. Export your budget, guest lists, and timelines with one click.</p>
          <ul style={{marginTop: '1.5rem', marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
             <li>Branded client portals</li>
             <li>Automated weekly digests</li>
             <li>Spreadsheet CSV exports</li>
          </ul>
        </div>
      </div>
    </section>
    
    <CTA />
  </motion.div>
);

const Process = () => (
  <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="page-content">
    <div style={{padding: '6rem 0 2rem', textAlign: 'center'}}>
      <h1 style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)'}}>How It Works</h1>
      <p style={{color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto', fontSize: '1.25rem'}}>A transparent look at how Eventra takes you from concept to flawless execution.</p>
    </div>
    <ProcessSection />
    
    {/* Extended Process Content */}
    <section className="container" style={{padding: '4rem 0 8rem'}}>
      <div style={{background: 'var(--ui-bg)', padding: '4rem', borderRadius: 'var(--radius)', textAlign: 'center'}}>
        <h2 style={{marginBottom: '2rem', fontSize: '2.5rem'}}>Onboarding is a Breeze</h2>
        <p style={{color: 'var(--muted)', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.125rem'}}>We don't expect you to start from a blank slate. Eventra comes packed with industry-standard templates so you can hit the ground running.</p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem'}}>
          <div style={{background: 'var(--surface)', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}}>
            <h3 style={{marginBottom: '0.5rem', color: 'var(--primary)'}}>Wedding Template</h3>
            <p style={{fontSize: '0.875rem', color: 'var(--muted)'}}>Includes 150+ pre-filled tasks covering everything from rings to registry.</p>
          </div>
          <div style={{background: 'var(--surface)', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}}>
            <h3 style={{marginBottom: '0.5rem', color: 'var(--primary)'}}>Conference Template</h3>
            <p style={{fontSize: '0.875rem', color: 'var(--muted)'}}>Built for scale with speaker management and ticketing workflows.</p>
          </div>
          <div style={{background: 'var(--surface)', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}}>
            <h3 style={{marginBottom: '0.5rem', color: 'var(--primary)'}}>Gala Template</h3>
            <p style={{fontSize: '0.875rem', color: 'var(--muted)'}}>Optimized for sponsorships, VIP seating arrangements, and silent auctions.</p>
          </div>
        </div>
      </div>
    </section>
    
    <CTA />
  </motion.div>
);

const Testimonials = () => (
  <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="page-content">
    <div style={{padding: '6rem 0 2rem', textAlign: 'center'}}>
      <h1 style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)'}}>Success Stories</h1>
      <p style={{color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto', fontSize: '1.25rem'}}>Hear directly from the people who transformed their planning process with Eventra.</p>
    </div>
    <TestimonialsSection />
    
    {/* Extended Testimonials Content */}
    <section className="container" style={{padding: '4rem 0 8rem'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '4rem'}}>
        <div style={{display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap'}}>
          <div style={{flex: '1 1 400px'}}>
            <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>“It saved our agency hundreds of hours.”</h2>
            <p style={{color: 'var(--muted)', fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.8'}}>Before Eventra, our event agency used a fragmented mess of Google Sheets, Trello boards, and endless email threads. Managing 5-6 corporate events simultaneously was a nightmare. When we switched, the centralized vendor tracking alone saved our coordinators around 15 hours a week.</p>
            <div style={{fontWeight: '700'}}>Sarah Jenkins</div>
            <div style={{color: 'var(--secondary)'}}>Founder, Apex Events</div>
          </div>
          <div style={{flex: '1 1 400px', background: 'var(--ui-bg)', height: '300px', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{color: 'var(--muted)'}}>[ Video Testimonial Placeholder ]</span>
          </div>
        </div>
      </div>
    </section>
    
    <CTA />
  </motion.div>
);

const FAQ = () => (
  <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="page-content">
    <div style={{padding: '6rem 0 2rem', textAlign: 'center'}}>
      <h1 style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)'}}>Help Center</h1>
      <p style={{color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto', fontSize: '1.25rem'}}>Everything you need to know about getting started and succeeding with Eventra.</p>
    </div>
    <FAQSection />
    
    {/* Extended FAQ Content */}
    <section className="container" style={{padding: '4rem 0 8rem', textAlign: 'center'}}>
      <div style={{background: 'var(--ui-bg)', padding: '4rem', borderRadius: 'var(--radius)'}}>
        <h2 style={{marginBottom: '1rem'}}>Still have questions?</h2>
        <p style={{color: 'var(--muted)', marginBottom: '2rem'}}>Our support team is available 24/7 to help you plan the perfect event.</p>
        <button className="btn btn-outline" style={{padding: '1rem 3rem'}}>Contact Support</button>
      </div>
    </section>
    
    <CTA />
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/process" element={<Process />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </AnimatePresence>
  );
};

// --- SCROLL TO TOP UTILITIES ---
const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 99,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'var(--secondary)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={28} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- APP COMPONENT ---
export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTopOnMount />
      <Navbar onContactClick={() => setIsContactModalOpen(true)} />
      
      <main style={{ minHeight: '80vh' }}>
        <AnimatedRoutes />
      </main>

      <Footer onContactClick={() => setIsContactModalOpen(true)} />
      
      <ScrollToTopButton />
      
      <AnimatePresence>
        {isContactModalOpen && (
          <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        )}
      </AnimatePresence>
    </Router>
  );
}
