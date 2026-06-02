import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  CriticalButton,
  Fieldset,
  FormField,
  Heading,
  Modal,
  NumberInput,
  PrimaryButton,
  Radio,
  Select,
  Text,
  Toaster,
  showToast,
  useModal,
  vars,
} from '@janeapp/burrito-design-system'
import { JaneNavBar } from '../../jane-nav/src/components/JaneNavBar'

/* ─────────────────────────────────────────────────────────────────
 *  Data
 * ───────────────────────────────────────────────────────────────── */

type StaffMember = {
  name: string
  initials: string
  discipline: string
  credentials?: string
  email: string
  username: string
  home: string
  mobile: string
  address: string[]
  bio: string
  photo?: string
}

const STAFF: StaffMember[] = [
  {
    name: 'Michael Carroll', initials: 'MC', discipline: 'Naturopathic Medicine', credentials: 'BSc, ND',
    email: 'michael.carroll@jane.clinic', username: 'naturopath',
    home: '+1 515 203 2105', mobile: '+1 718 896 4901',
    address: ['25238 Nitzsche Meadow', 'Whitehorse NB M6N 8K7', 'CA'],
    bio: 'Dr. Michael Carroll first brought naturopathy to the clinic after earning his Doctorate of Naturopathic Medicine in 2006. He also holds a Bachelor of Science degree in both pre-medical science and env...',
  },
  {
    name: 'Marcus Gregory', initials: 'MG', discipline: 'Chiropractic', credentials: 'DC',
    email: 'marcus.gregory@jane.clinic', username: 'chiropractor',
    home: '+1 604 555 0142', mobile: '+1 778 555 0188',
    address: ['1450 Robson Street', 'Vancouver BC V6E 1C1', 'CA'],
    bio: 'Dr. Marcus Gregory has been practicing chiropractic for over 12 years, with a focus on sports injuries and rehabilitation.',
  },
  {
    name: 'Amy Kendrick', initials: 'AK', discipline: 'Massage Therapy', credentials: 'RMT',
    email: 'amy.kendrick@jane.clinic', username: 'rmt-amy',
    home: '+1 250 555 0177', mobile: '+1 250 555 0123',
    address: ['88 Lonsdale Avenue', 'North Vancouver BC V7M 2E6', 'CA'],
    bio: 'Amy is a Registered Massage Therapist with 8 years of experience treating chronic pain, sports injuries, and pregnancy-related discomfort.',
  },
  {
    name: 'April Kennedy', initials: 'AK', discipline: 'Physiotherapy', credentials: 'PT',
    email: 'april.kennedy@jane.clinic', username: 'pt-april',
    home: '+1 403 555 0192', mobile: '+1 587 555 0144',
    address: ['12 Riverbend Way', 'Calgary AB T2C 4M1', 'CA'],
    bio: 'April is a Physiotherapist focused on post-surgical rehab and orthopedic conditions.',
  },
  {
    name: 'Susan Lo', initials: 'SL', discipline: 'Massage Therapy', credentials: 'RMT',
    email: 'susan.lo@gmail.com', username: 'therapist',
    home: '(376) 051-4691', mobile: '(095) 936-8772',
    address: ['527 Streich Alley', 'Erin ON R5S 9S4', 'CA'],
    bio: 'Susan graduated in 2009, and has a special interest in the the treatment of headaches, sports injuries and maintenance, and lower back pain. She believes in using evidence-based treatment and encourag...',
    photo: '/susan-lo.jpg',
  },
  {
    name: 'Maya Lopez-Chapman', initials: 'ML', discipline: 'Counselling / Psychology', credentials: 'MA, RCC',
    email: 'maya.lopez-chapman@jane.clinic', username: 'counsellor',
    home: '+1 604 555 0166', mobile: '+1 778 555 0199',
    address: ['2110 Granville Street', 'Vancouver BC V6H 3E6', 'CA'],
    bio: 'Maya is a Registered Clinical Counsellor offering individual therapy and couples counselling.',
  },
  {
    name: 'Jo-Ellen McKay', initials: 'JM', discipline: 'Physiotherapy / Clinical Pilates', credentials: 'PT',
    email: 'joellen.mckay@jane.clinic', username: 'pt-joellen',
    home: '+1 416 555 0133', mobile: '+1 647 555 0177',
    address: ['350 Bay Street', 'Toronto ON M5H 2S6', 'CA'],
    bio: 'Jo-Ellen combines physiotherapy and Clinical Pilates for rehab and movement re-education.',
  },
  {
    name: 'Jonathan Morris', initials: 'JM', discipline: 'Acupuncture / Physiotherapy', credentials: 'PT, R.Ac',
    email: 'jonathan.morris@jane.clinic', username: 'pt-jonathan',
    home: '+1 902 555 0145', mobile: '+1 902 555 0198',
    address: ['44 Spring Garden Road', 'Halifax NS B3J 3R8', 'CA'],
    bio: 'Jonathan integrates acupuncture into physiotherapy treatment for pain and recovery.',
  },
  {
    name: 'Helen Rosewood', initials: 'HR', discipline: 'Counselling / Psychology', credentials: 'PhD, RCC',
    email: 'helen.rosewood@jane.clinic', username: 'psychologist',
    home: '+1 604 555 0121', mobile: '+1 778 555 0166',
    address: ['1199 W Pender Street', 'Vancouver BC V6E 2R1', 'CA'],
    bio: 'Dr. Rosewood is a Registered Clinical Counsellor with a doctorate in psychology, specializing in anxiety and trauma.',
  },
  {
    name: 'Zoey Swift', initials: 'ZS', discipline: 'Acupuncture / Massage Therapy', credentials: 'R.Ac, RMT',
    email: 'zoey.swift@jane.clinic', username: 'racrmt',
    home: '+1 250 555 0188', mobile: '+1 250 555 0144',
    address: ['101 Yates Street', 'Victoria BC V8W 1L4', 'CA'],
    bio: 'Zoey is a dual-licensed Acupuncturist and RMT focused on integrated bodywork.',
  },
  {
    name: 'Frank Warren', initials: 'FW', discipline: 'Physiotherapy', credentials: 'PT',
    email: 'frank.warren@jane.clinic', username: 'pt-frank',
    home: '+1 780 555 0192', mobile: '+1 780 555 0123',
    address: ['10222 Jasper Avenue', 'Edmonton AB T5J 5K4', 'CA'],
    bio: 'Frank is a Physiotherapist with a focus on geriatric rehab and balance training.',
  },
]

const getStaff = (name: string): StaffMember =>
  STAFF.find(s => s.name === name) ?? STAFF[0]

const NAV_ITEMS = [
  { label: 'Day' },
  { label: 'Schedule' },
  { label: 'Patients' },
  { label: 'Staff' },
  { label: 'Billing' },
  { label: 'Reports' },
  { label: 'Settings' },
]

const PROFILE_TABS = [
  'Profile', 'Edit/Settings', 'Treatments, Classes & Group Appointments',
  'Templates', 'AI Scribe', 'Charts', 'Communications', 'Tasks', 'Phrases', 'Billing', 'Timesheets',
]

const EDIT_TABS = [
  'Personal Info', 'Photo & Bio', 'Settings', 'Online Booking', 'Permissions & Commissions',
]

const HOUR_START = 12
const HOUR_END = 19
const ROW_HEIGHT = 80
const HOURS = Array.from({ length: HOUR_END - HOUR_START + 1 }, (_, i) => HOUR_START + i)

const TREATMENTS = [
  { id: '30-min-massage', label: '30 Minute Massage', duration: 0.5 },
  { id: '45-min-massage', label: '45 Minute Massage', duration: 0.75 },
  { id: '60-min-massage', label: '60 Minute Massage', duration: 1.0 },
  { id: '90-min-massage', label: '90 Minute Massage', duration: 1.5 },
]

const PATIENTS = [
  { name: 'Madison Barnaby', detail: 'F · DOB 1991-03-12' },
  { name: 'Avery Chan',      detail: 'F · DOB 1988-07-04' },
  { name: 'Aubrey French',   detail: 'F · DOB 1995-11-23' },
  { name: 'Lily Smith',      detail: 'F · DOB 1990-02-09' },
  { name: 'James Martin',    detail: 'M · DOB 1982-05-18' },
  { name: 'Owen Anderson',   detail: 'M · DOB 1985-09-27' },
]

type Page = 'profile' | 'edit' | 'schedule' | 'booking-site' | 'booking-appointment'

type BookingTarget = { staff: StaffMember; locationName: string; locationArea: string }

/* ─────────────────────────────────────────────────────────────────
 *  App
 * ───────────────────────────────────────────────────────────────── */

export function App() {
  const isMobile = useNarrowScreen(768)
  const [page, setPage] = useState<Page>('profile')
  const [activeStaff, setActiveStaff] = useState<string>('Susan Lo')
  const [bookingTarget, setBookingTarget] = useState<BookingTarget | null>(null)
  const [limitMode, setLimitMode] = useState<'no-limit' | 'set-limit'>('no-limit')
  const [limitValue, setLimitValue] = useState('')
  const [onlineBookingEnabled, setOnlineBookingEnabled] = useState(true)
  const [rollingAvailability, setRollingAvailability] = useState('no-limit')
  const [startTimes, setStartTimes] = useState('sequentially')
  const [clustering, setClustering] = useState('no-clustering')

  // The booking-limit feature is only modeled for Susan Lo (the demo target).
  // When viewing other staff, hide the limit form & treat their cap as null.
  const isSusan = activeStaff === 'Susan Lo'

  // Reset the limit form to "No Limit" each time the user opens the Edit page,
  // so prior session clicks don't leak across.
  React.useEffect(() => {
    if (page === 'edit') {
      setLimitMode('no-limit')
      setLimitValue('')
    }
  }, [page])

  const handleSave = () => {
    const n = limitMode === 'set-limit' ? (limitValue || '0') : null
    setPage('profile')
    showToast({
      content: n != null
        ? `Daily booking limit for ${activeStaff} updated to ${n} appointments.`
        : `Daily booking limit removed for ${activeStaff}.`,
      tone: 'success',
      isDismissible: true,
      timeout: 5000,
    })
  }

  const handleNavClick = (label: string) => {
    if (label === 'Schedule' || label === 'Day') setPage('schedule')
    else if (label === 'Staff') {
      setActiveStaff('Michael Carroll')
      setPage('profile')
    }
  }

  const handleAccountMenuClick = (label: string) => {
    if (label === 'Online Booking Site') setPage('booking-site')
  }

  const handleStaffClick = (name: string) => {
    setActiveStaff(name)
    setPage('profile')
  }

  const activeNav = page === 'schedule' ? 'Schedule' : 'Staff'
  const cap = limitMode === 'set-limit' ? Number(limitValue) : null

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4', display: 'flex', flexDirection: 'column' }}>
      {!(isMobile && page === 'schedule') && page !== 'booking-site' && page !== 'booking-appointment' && (
        <JaneNavBar
          activeNav={activeNav}
          navItems={NAV_ITEMS}
          onNavClick={handleNavClick}
          onAccountMenuClick={handleAccountMenuClick}
        />
      )}
      <Toaster zIndex={2000} />

      {page === 'booking-site'
        ? <OnlineBookingSite
            onBack={() => setPage('profile')}
            onSelectPractitioner={(target) => { setBookingTarget(target); setPage('booking-appointment') }}
            onJaneClick={() => setPage('schedule')}
          />
        : page === 'booking-appointment' && bookingTarget
        ? <BookingAppointmentPage
            target={bookingTarget}
            onBack={() => setPage('booking-site')}
            onAccount={() => setPage('profile')}
            onJaneClick={() => setPage('schedule')}
          />
        : page === 'schedule'
        ? <SchedulePage cap={cap} />
        : (
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <StaffSidebar activeStaff={activeStaff} onStaffClick={handleStaffClick} />
            {page === 'profile'
              ? <ProfilePage staff={getStaff(activeStaff)} onEdit={() => setPage('edit')} dailyLimit={isSusan ? cap : null} />
              : <EditPage
                  staff={getStaff(activeStaff)}
                  onSave={handleSave}
                  onCancel={() => setPage('profile')}
                  onlineBookingEnabled={onlineBookingEnabled}
                  setOnlineBookingEnabled={setOnlineBookingEnabled}
                  limitMode={limitMode}
                  setLimitMode={setLimitMode}
                  limitValue={limitValue}
                  setLimitValue={setLimitValue}
                  rollingAvailability={rollingAvailability}
                  setRollingAvailability={setRollingAvailability}
                  startTimes={startTimes}
                  setStartTimes={setStartTimes}
                  clustering={clustering}
                  setClustering={setClustering}
                />
            }
          </div>
        )
      }
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  Avatar
 * ───────────────────────────────────────────────────────────────── */

function Avatar({ initials, size = 32, color }: { initials: string; size?: number; color?: string }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color ?? 'linear-gradient(135deg, #C9D7DF, #A4B7C2)',
      color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 600, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  Left sidebar — Staff list
 * ───────────────────────────────────────────────────────────────── */

function StaffSidebar({ activeStaff, onStaffClick }: { activeStaff: string; onStaffClick: (name: string) => void }) {
  return (
    <aside style={{
      width: 240, background: 'white', borderRight: '1px solid #e2e2e2',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      <div style={{ padding: 12, borderBottom: '1px solid #eee' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#f5f5f5', borderRadius: 4, padding: '7px 10px',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#999" strokeWidth="1.5">
            <circle cx="6" cy="6" r="4.5"/><path d="M9.5 9.5L13 13"/>
          </svg>
          <input
            placeholder="Staff Search..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit' }}
          />
        </div>
        <div style={{ textAlign: 'center', padding: '10px 0 4px', fontSize: 13, color: '#444', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
          All Staff
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="#666" strokeWidth="1.5"><path d="M1 1l3 3 3-3"/></svg>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {STAFF.map(s => {
          const isActive = s.name === activeStaff
          const [first, ...rest] = s.name.split(' ')
          const last = rest.join(' ')
          return (
            <div
              key={s.name}
              onClick={() => onStaffClick(s.name)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                background: isActive ? '#d6ecec' : 'transparent', cursor: 'pointer',
                borderBottom: '1px solid #f3f3f3',
              }}
            >
              <Avatar initials={s.initials} size={28} />
              <Text size="sm" style={{ flex: 1 }}>{first} <strong>{last}</strong></Text>
              {isActive && (
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#bbb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>+</div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ padding: 12, borderTop: '1px solid #eee' }}>
        <Button>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 14, height: 14, borderRadius: '50%', background: vars.global.color.brand['70'], color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, lineHeight: 1 }}>+</span>
            New Staff Member
          </span>
        </Button>
      </div>
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  PROFILE PAGE
 * ───────────────────────────────────────────────────────────────── */

function ProfilePage({ staff, onEdit, dailyLimit }: { staff: StaffMember; onEdit: () => void; dailyLimit: number | null }) {
  return (
    <main style={{ flex: 1, padding: '20px 24px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Avatar initials={staff.initials} size={36} />
        <Heading level={1} style={{ margin: 0 }}>{staff.name}</Heading>
      </div>

      <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        <ProfileTab active>Profile</ProfileTab>
        {PROFILE_TABS.slice(1).map(t => (
          <ProfileTab key={t} onClick={t === 'Edit/Settings' ? onEdit : undefined}>{t}</ProfileTab>
        ))}
        <button style={{
          marginLeft: 'auto', background: '#e0e0e0', border: 'none', borderRadius: 4,
          width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" stroke="#666" fill="none" strokeWidth="1.5"><path d="M2 8l4-4 4 4"/></svg>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div>
          <Card>
            <ProfileRow label="Name">
              <Text size="sm">{staff.name}{staff.credentials ? ` ${staff.credentials}` : ''}</Text>
            </ProfileRow>
            <ProfileRow label="Discipline">
              <Text size="sm">{staff.discipline}</Text>
            </ProfileRow>
            <ProfileRow label="Email">
              <a href="#" style={{ color: vars.global.color.brand['70'], textDecoration: 'none' }}>{staff.email}</a>
              <Pill text="Do Not Email" tone="grey" />
            </ProfileRow>
            <ProfileRow label="Username / Logins">
              <Pill text={`Username: ${staff.username}`} tone="green" />
            </ProfileRow>
            <ProfileRow label="2-Step Verification">
              <Pill text="Inactive" tone="yellow" />
              <HelpIcon />
            </ProfileRow>
            <ProfileRow label="Home" icon={<HomeIcon />}>
              <Text size="sm">{staff.home}</Text>
            </ProfileRow>
            <ProfileRow label="Mobile" icon={<MobileIcon />}>
              <Text size="sm">{staff.mobile}</Text>
            </ProfileRow>
            <ProfileRow label="Address">
              <div>
                {staff.address.map((line, i) => (
                  <Text key={i} size="sm" style={{ display: 'block' }}>{line}</Text>
                ))}
              </div>
            </ProfileRow>
            <ProfileRow label="Bio">
              <Text size="sm">{staff.bio}</Text>
            </ProfileRow>

            <div style={{ display: 'flex', gap: 8, padding: 14, borderTop: '1px solid #eee', background: '#fafafa' }}>
              <Button>Manage Shifts</Button>
              <Button>View Schedule</Button>
              <Button>View Day Sheet</Button>
              <div style={{ flex: 1 }} />
              <Button onClick={onEdit}>Edit Profile</Button>
            </div>
          </Card>

          <Heading level={2} style={{ margin: '24px 0 12px' }}>Calendars</Heading>

          <Card>
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <GoogleCalendarIcon />
                <Heading level={3} style={{ margin: 0 }}>Google Calendar in Jane</Heading>
              </div>
              <Text size="sm" style={{ color: '#555', display: 'block', marginBottom: 12 }}>
                Creating a connection to your Google calendar lets you view your calendar events within Jane on the Day and Schedule views.
              </Text>
              <Button>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <ExternalLinkIcon /> Connect to Google Calendar
                </span>
              </Button>
              <div style={{ marginTop: 12 }}>
                <a href="#" style={{ color: vars.global.color.brand['70'], fontSize: 13, textDecoration: 'none' }}>
                  Learn what you can do with Google Calendar
                </a>
              </div>
            </div>
          </Card>

          <div style={{ marginTop: 12 }}>
            <Card>
              <div style={{ padding: 16 }}>
                <Heading level={3} style={{ margin: '0 0 8px' }}>Calendar subscription feeds</Heading>
                <Text size="sm" style={{ color: '#555', display: 'block', marginBottom: 12 }}>
                  View your appointments and shifts in any calendar software by subscribing to your calendar feeds.
                </Text>
                <Button>Create calendar feeds</Button>
                <div style={{ marginTop: 12 }}>
                  <a href="#" style={{ color: vars.global.color.brand['70'], fontSize: 13, textDecoration: 'none' }}>
                    Consent and help information ▾
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card>
            <div style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text size="sm" style={{ flex: 1 }}>Send Welcome Email</Text>
              <Button>Add A Note</Button>
            </div>
          </Card>

          <Card>
            <div style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <Heading level={3} style={{ margin: 0, flex: 1 }}>Supervision</Heading>
                <Pill text="New" tone="yellow" />
              </div>
              <Text size="sm" style={{ display: 'block', marginBottom: 8 }}>
                You are supervising 1 staff member.
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar initials="ZS" size={24} />
                <Text size="sm">Zoey Swift</Text>
              </div>
            </div>
          </Card>

          {dailyLimit != null && (
            <Card>
              <div style={{ padding: 14 }}>
                <Heading level={3} style={{ margin: '0 0 6px' }}>Online Booking</Heading>
                <Text size="sm" style={{ display: 'block', color: '#555' }}>
                  Daily booking limit: <strong>{dailyLimit} appointments</strong>
                </Text>
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  EDIT PAGE — Online Booking tab
 * ───────────────────────────────────────────────────────────────── */

function EditPage({
  staff,
  onSave, onCancel,
  onlineBookingEnabled, setOnlineBookingEnabled,
  limitMode, setLimitMode,
  limitValue, setLimitValue,
  rollingAvailability, setRollingAvailability,
  startTimes, setStartTimes,
  clustering, setClustering,
}: {
  staff: StaffMember
  onSave: () => void; onCancel: () => void
  onlineBookingEnabled: boolean; setOnlineBookingEnabled: (v: boolean) => void
  limitMode: 'no-limit' | 'set-limit'; setLimitMode: (v: 'no-limit' | 'set-limit') => void
  limitValue: string; setLimitValue: (v: string) => void
  rollingAvailability: string; setRollingAvailability: (v: string) => void
  startTimes: string; setStartTimes: (v: string) => void
  clustering: string; setClustering: (v: string) => void
}) {
  return (
    <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 24px 0' }}>
        <Heading level={1} style={{ margin: '0 0 16px' }}>Edit Staff Member - {staff.name}</Heading>

        <Card>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #eee', display: 'flex' }}>
            {EDIT_TABS.map(t => <EditTab key={t} active={t === 'Online Booking'}>{t}</EditTab>)}
          </div>

          <div style={{ padding: 24, maxWidth: 640 }}>
            <Heading level={2} style={{ margin: '0 0 16px' }}>Online Booking</Heading>

            <div style={{ marginBottom: 24 }}>
              <Checkbox
                checked={onlineBookingEnabled}
                onChange={(e) => setOnlineBookingEnabled(e.target.checked)}
              >
                Enable Online Booking
              </Checkbox>
            </div>

            <FormField.Label>Daily Booking Limit</FormField.Label>
            <FormField.HelperText>
              Limit the number of appointments patients can book online per day for this practitioner.
              Once reached, no further availability will show online. Appointments can still be added manually from the schedule.
            </FormField.HelperText>

            <Fieldset>
              <FormField>
                <Radio
                  name="limit-mode"
                  value="no-limit"
                  checked={limitMode === 'no-limit'}
                  onChange={(e) => setLimitMode(e.target.value as 'no-limit' | 'set-limit')}
                >
                  No Limit
                </Radio>
              </FormField>
              <FormField>
                <Radio
                  name="limit-mode"
                  value="set-limit"
                  checked={limitMode === 'set-limit'}
                  onChange={(e) => setLimitMode(e.target.value as 'no-limit' | 'set-limit')}
                >
                  Set a Limit
                </Radio>
              </FormField>
            </Fieldset>

            {limitMode === 'set-limit' && (
              <div style={{ marginTop: 16, maxWidth: 360 }}>
                <FormField>
                  <FormField.Label>Appointments Bookable Online Per Day</FormField.Label>
                  <NumberInput
                    value={limitValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLimitValue(e.target.value)}
                    min={0}
                    required
                  />
                </FormField>
              </div>
            )}

            <div style={{ marginTop: 24, maxWidth: 360 }}>
              <FormField>
                <FormField.Label>Online Rolling Availability</FormField.Label>
                <Select
                  value={rollingAvailability}
                  onChange={(e) => setRollingAvailability(e.target.value)}
                >
                  <Select.Option value="no-limit">No Limit</Select.Option>
                  <Select.Option value="2-weeks">2 Weeks</Select.Option>
                  <Select.Option value="4-weeks">4 Weeks</Select.Option>
                </Select>
              </FormField>
            </div>

            <div style={{ marginTop: 24, maxWidth: 360 }}>
              <FormField>
                <FormField.Label>Online Booking Start Times</FormField.Label>
                <FormField.HelperText>
                  Choose how Jane will offer start times in Online Booking. Default is sequentially.
                </FormField.HelperText>
                <Select
                  value={startTimes}
                  onChange={(e) => setStartTimes(e.target.value)}
                >
                  <Select.Option value="sequentially">Sequentially</Select.Option>
                  <Select.Option value="shortest">Based on My Shortest Session</Select.Option>
                </Select>
              </FormField>
            </div>

            <div style={{ marginTop: 24, maxWidth: 360 }}>
              <FormField>
                <FormField.Label>Cluster Online Bookings</FormField.Label>
                <FormField.HelperText>
                  Allow bookings any time within your shift or only adjacent to existing bookings.
                </FormField.HelperText>
                <Select
                  value={clustering}
                  onChange={(e) => setClustering(e.target.value)}
                >
                  <Select.Option value="no-clustering">Display all availability (No Clustering)</Select.Option>
                  <Select.Option value="cluster">Cluster bookings together</Select.Option>
                </Select>
              </FormField>
            </div>
          </div>
        </Card>

        <div style={{ height: 80 }} />
      </div>

      <div style={{
        position: 'sticky', bottom: 0, background: 'white', borderTop: '1px solid #e2e2e2',
        padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <CriticalButton>Delete Staff Member</CriticalButton>
        <div style={{ flex: 1 }} />
        <Button onClick={onCancel}>Cancel</Button>
        <PrimaryButton onClick={onSave}>Save</PrimaryButton>
      </div>
    </main>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  SCHEDULE PAGE
 * ───────────────────────────────────────────────────────────────── */

type Appt = {
  startHour: number
  endHour: number
  patient: string
  treatment: string
  insurance?: string
  color?: 'teal' | 'darkTeal' | 'green'
}

type Practitioner = {
  name: string
  initials: string
  discipline: string
  cap: number | null
  booked: number
  waitlist: number
  appts: Appt[]
}

function SchedulePage({ cap }: { cap: number | null }) {
  const isMobile = useNarrowScreen(768)
  const susanCap = cap && cap > 0 ? cap : 6

  const [susanAppts, setSusanAppts] = useState<Appt[]>([
    { startHour: 12.0, endHour: 13.5, patient: 'Zoe Gagnon', treatment: '90 Minute Massage', insurance: 'Pacific Blue Cross (Paper)', color: 'teal' },
    { startHour: 13.5, endHour: 14.0, patient: 'Aubrey French', treatment: '30 Minute Massage', color: 'teal' },
    { startHour: 14.0, endHour: 14.5, patient: 'Eva Mackay', treatment: '30 Minute Massage', insurance: 'WSBC', color: 'green' },
    { startHour: 15.5, endHour: 16.0, patient: 'Aubrey French', treatment: '30 Minute Massage', insurance: 'Pacific Blue Cross (Paper)', color: 'teal' },
    { startHour: 16.0, endHour: 16.5, patient: 'Beatrice Clark', treatment: '30 Minute Massage', color: 'teal' },
    { startHour: 17.25, endHour: 18.0, patient: 'Dylan Grewal', treatment: '45 Minute Massage', color: 'teal' },
  ])

  const [panelOpen, setPanelOpen] = useState(false)
  const [panelPractitioner, setPanelPractitioner] = useState<string | null>(null)
  const [panelTime, setPanelTime] = useState<number | null>(null)
  const [formTreatment, setFormTreatment] = useState<string>('')
  const [formPatient, setFormPatient] = useState<string>('')
  const [formNotes, setFormNotes] = useState<string>('')

  const { state, modalProps } = useModal()

  const practitioners: Practitioner[] = [
    {
      name: 'Jo-Ellen McKay', initials: 'JM', discipline: 'Physiotherapy / Clinical Pilates',
      cap: null, booked: 1, waitlist: 1,
      appts: [
        { startHour: 12.5, endHour: 13.5, patient: 'Elizabeth Bélanger', treatment: 'Subsequent Treatment', color: 'teal' },
        { startHour: 15.0, endHour: 16.0, patient: 'Clinical Pilates', treatment: '0 / 5', color: 'darkTeal' },
        { startHour: 16.0, endHour: 17.0, patient: 'Chloe Ma', treatment: 'Initial Assessment and Treatment', color: 'teal' },
      ],
    },
    {
      name: 'Amy Kendrick', initials: 'AK', discipline: 'Massage Therapy',
      cap: 8, booked: 3, waitlist: 1,
      appts: [
        { startHour: 13.0, endHour: 14.5, patient: 'Samuel Clark', treatment: '90 Minute Massage', insurance: 'Manulife', color: 'teal' },
        { startHour: 16.0, endHour: 16.5, patient: 'Owen Anderson', treatment: '30 Minute Massage', insurance: 'Manulife', color: 'teal' },
      ],
    },
    {
      name: 'Susan Lo', initials: 'SL', discipline: 'Massage Therapy',
      cap: susanCap, booked: susanAppts.length, waitlist: 1,
      appts: susanAppts,
    },
    {
      name: 'Michael Carroll', initials: 'MC', discipline: 'Naturopathic Medicine',
      cap: 8, booked: 3, waitlist: 3,
      appts: [
        { startHour: 12.5, endHour: 13.0, patient: 'Lily Smith', treatment: '30 Minute Return Visit', insurance: 'WCB', color: 'teal' },
        { startHour: 15.5, endHour: 16.0, patient: 'Aubrey French', treatment: '30 Minute Massage', insurance: 'Pacific Blue Cross (Paper)', color: 'teal' },
        { startHour: 16.5, endHour: 17.0, patient: 'James Smith', treatment: '30 Minute Return Visit', insurance: 'WCB', color: 'teal' },
      ],
    },
  ]

  const openPanel = (pName: string, hour: number) => {
    setPanelPractitioner(pName)
    setPanelTime(hour)
    setFormTreatment('')
    setFormPatient('')
    setFormNotes('')
    setPanelOpen(true)
  }

  const closePanel = () => {
    setPanelOpen(false)
    setPanelPractitioner(null)
    setPanelTime(null)
  }

  const handleBookAppointment = () => {
    const p = practitioners.find(x => x.name === panelPractitioner)
    if (p && p.cap != null && p.booked >= p.cap) {
      state.open()
    } else {
      commitBooking()
    }
  }

  const commitBooking = () => {
    if (panelPractitioner !== 'Susan Lo' || panelTime == null) {
      closePanel()
      state.close()
      return
    }
    const treatment = TREATMENTS.find(t => t.id === formTreatment)
    const duration = treatment?.duration ?? 0.5
    const label = treatment?.label ?? '30 Minute Massage'
    const patient = formPatient.trim() || 'New Patient'

    setSusanAppts(prev => [...prev, {
      startHour: panelTime,
      endHour: panelTime + duration,
      patient,
      treatment: label,
      color: 'teal',
    }])
    showToast({
      content: `Appointment booked for ${patient} at ${formatHour(panelTime)}.`,
      tone: 'success',
      isDismissible: true,
      timeout: 5000,
    })
    closePanel()
    state.close()
  }

  if (isMobile) {
    return (
      <MobileSchedule
        practitioners={practitioners}
        susanCap={susanCap}
        modalState={state}
        modalProps={modalProps}
        panelOpen={panelOpen}
        panelPractitioner={panelPractitioner}
        panelTime={panelTime}
        formTreatment={formTreatment}
        setFormTreatment={setFormTreatment}
        formPatient={formPatient}
        setFormPatient={setFormPatient}
        formNotes={formNotes}
        setFormNotes={setFormNotes}
        openPanel={openPanel}
        closePanel={closePanel}
        handleBookAppointment={handleBookAppointment}
        commitBooking={commitBooking}
      />
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: '#f4f4f4' }}>
      <ScheduleSidebar />

      <main style={{ flex: 1, padding: '14px 18px', overflowY: 'auto', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <Heading level={1} style={{ margin: 0, flex: 1 }}>May 22nd 2026</Heading>
          <div style={{ display: 'flex', gap: 6 }}>
            <Button>Reminders</Button>
            <Button>Wait List</Button>
            <Button>Shifts ▾</Button>
            <Button>Resources</Button>
            <Button>Rooms ▾</Button>
          </div>
        </div>

        <div style={{ background: 'white', border: '1px solid #e2e2e2', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
            <Text size="sm" style={{ color: '#E8A33D', fontWeight: 600, display: 'block', lineHeight: 1.2 }}>Today</Text>
            <Text size="sm" style={{ color: '#E8A33D', fontWeight: 600 }}>May 22, 2026</Text>
          </div>

          {/* Practitioner header row */}
          <div style={{ display: 'grid', gridTemplateColumns: `60px repeat(${practitioners.length}, 1fr)`, borderBottom: '1px solid #e2e2e2' }}>
            <div />
            {practitioners.map(p => (
              <div key={p.name} style={{ borderRight: '1px solid #e2e2e2' }}>
                <div style={{ padding: '8px 10px 4px' }}>
                  <Text size="sm" style={{ color: vars.global.color.brand['70'], fontWeight: 500 }}>{p.discipline}</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 10px' }}>
                  <Avatar initials={p.initials} size={28} />
                  <Text size="sm" style={{ flex: 1, color: vars.global.color.brand['70'] }}>{p.name}</Text>
                  {p.cap != null && <AvailabilityBadge cap={p.cap} booked={p.booked} />}
                  <WaitlistBadge count={p.waitlist} />
                </div>
              </div>
            ))}
          </div>

          {/* Time grid */}
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: `60px repeat(${practitioners.length}, 1fr)` }}>
            <div>
              {HOURS.map(h => (
                <div key={h} style={{ height: ROW_HEIGHT, borderBottom: '1px solid #f0f0f0', padding: '4px 6px', boxSizing: 'border-box' }}>
                  <Text size="sm" style={{ color: '#777', lineHeight: 1.1 }}>{formatHour(h)}</Text>
                </div>
              ))}
            </div>

            {practitioners.map(p => {
              const reservedDuration = TREATMENTS.find(t => t.id === formTreatment)?.duration ?? 0.25
              const reservedSlot = panelOpen && panelPractitioner === p.name && panelTime != null
                ? { startHour: panelTime, duration: reservedDuration }
                : null
              return (
                <PractitionerSchedule
                  key={p.name}
                  p={p}
                  onSlotClick={hour => openPanel(p.name, hour)}
                  reservedSlot={reservedSlot}
                />
              )
            })}

            <CurrentTimeMarker hour={13.27} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, gap: 6 }}>
          <Button>‹</Button>
          <Button>Today</Button>
          <Button>›</Button>
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Staff Today</Button>
          <div style={{ flex: 1 }} />
          <Button>Go To Date</Button>
        </div>
      </main>

      {panelOpen && panelPractitioner && panelTime != null && (
        <NewAppointmentPanel
          practitioner={panelPractitioner}
          time={panelTime}
          treatment={formTreatment}
          setTreatment={setFormTreatment}
          patient={formPatient}
          setPatient={setFormPatient}
          notes={formNotes}
          setNotes={setFormNotes}
          onClose={closePanel}
          onBook={handleBookAppointment}
        />
      )}

      <Modal state={state} {...modalProps} size="md">
        <Modal.Header>
          <Modal.Title>This practitioner has reached their daily booking limit</Modal.Title>
          <Modal.CloseButton onClick={state.close} />
        </Modal.Header>
        <Modal.Content>
          <Text style={{ margin: 0 }}>
            Susan Lo has reached their daily limit of {susanCap} appointments.
            Online booking is paused for today, but you can still add this appointment manually.
          </Text>
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={state.close}>Cancel</Button>
          <PrimaryButton onClick={commitBooking}>Book Anyway</PrimaryButton>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  ONLINE BOOKING SITE
 * ───────────────────────────────────────────────────────────────── */

type Location = {
  name: string
  area: string
  address: string
  staff: StaffMember[]
}

function OnlineBookingSite({
  onBack, onSelectPractitioner, onJaneClick,
}: {
  onBack: () => void
  onSelectPractitioner: (target: BookingTarget) => void
  onJaneClick: () => void
}) {
  const teal = vars.global.color.brand['70']
  const locations: Location[] = [
    {
      name: 'The Village', area: 'Lynn Valley',
      address: '1000 Mountain Hwy., North Vancouver',
      staff: STAFF.slice(0, 10),
    },
    {
      name: 'The District', area: 'Downtown',
      address: '1234 Main St., Vancouver',
      staff: [STAFF[1], STAFF[7], STAFF[3], STAFF[5], STAFF[4], STAFF[9], STAFF[10]],
    },
  ]

  return (
    <div style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Top teal strip */}
      <div style={{
        background: teal, color: 'white',
        padding: '12px 32px',
        display: 'flex', alignItems: 'center', gap: 24,
      }}>
        <Text size="sm" style={{ color: 'white', flex: 1 }}>
          Welcome back Demo. You have 4 upcoming appointments.
        </Text>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', color: 'white',
          fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0,
        }}>My Account</button>
        <button style={{
          background: 'transparent', border: 'none', color: 'white',
          fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0,
        }}>Sign Out</button>
        <button
          onClick={onJaneClick}
          aria-label="Back to admin schedule"
          style={{
            background: 'transparent', border: 'none', color: 'white',
            fontFamily: 'inherit', fontStyle: 'italic', fontWeight: 700,
            fontSize: 20, lineHeight: 1, cursor: 'pointer', padding: 0,
          }}
        >Jane</button>
      </div>

      {/* Clinic branding */}
      <div style={{ padding: '28px 56px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          fontStyle: 'italic', fontWeight: 700, fontSize: 36,
          color: teal, lineHeight: 1,
        }}>Jane</div>
        <Text size="lg" style={{ color: '#9a9a9a', fontWeight: 400, fontSize: 26 }}>
          Demo Clinic
        </Text>
      </div>

      {/* Main card */}
      <div style={{ padding: '0 56px 56px' }}>
        <div style={{ background: 'white', border: '1px solid #e2e2e2', borderRadius: 2 }}>
          {/* Welcome banner */}
          <div style={{ background: teal, padding: '20px 28px' }}>
            <Heading level={1} style={{ margin: 0, color: 'white', fontWeight: 500, fontSize: 28 }}>
              Welcome to our online booking site
            </Heading>
          </div>

          {/* Locations */}
          {locations.map((loc, i) => (
            <div key={loc.name} style={{
              padding: '32px 32px 40px',
              borderTop: i > 0 ? '1px solid #e8e8e8' : 'none',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                    <Heading level={2} style={{ margin: 0, color: teal, fontWeight: 500 }}>
                      {loc.name}
                    </Heading>
                    <Text size="md" style={{ color: '#666' }}>{loc.area}</Text>
                  </div>
                  <Text size="sm" style={{ display: 'block', color: '#444', marginBottom: 16 }}>
                    {loc.address}
                  </Text>
                  <button style={{
                    background: teal, color: 'white', border: 'none',
                    padding: '12px 18px', borderRadius: 4, cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
                    width: '100%', maxWidth: 380,
                  }}>
                    Book an Appointment at {loc.name}
                  </button>
                </div>

                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
                }}>
                  {loc.staff.map(s => (
                    <PractitionerTile
                      key={s.name + i}
                      staff={s}
                      onClick={() => onSelectPractitioner({ staff: s, locationName: loc.name, locationArea: loc.area })}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PractitionerTile({ staff, onClick }: { staff: StaffMember; onClick?: () => void }) {
  return (
    <button onClick={onClick} title={staff.name} style={{
      aspectRatio: '1 / 1',
      border: '1px solid #e2e2e2', borderRadius: 2,
      background: staff.photo ? '#eef0f1' : 'linear-gradient(135deg, #C9D7DF, #8FA4B0)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontSize: 22, fontWeight: 600, letterSpacing: '-0.5px',
      cursor: 'pointer', padding: 0, fontFamily: 'inherit', overflow: 'hidden',
    }}>
      {staff.photo
        ? <img src={staff.photo} alt={staff.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : staff.initials}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  BOOKING APPOINTMENT PAGE  (Susan Lo treatment picker + calendar)
 * ───────────────────────────────────────────────────────────────── */

type Treatment = {
  id: string
  category: string
  label: string
  description: string
  duration: number   // minutes
  price: number      // $
  hasAddOns?: boolean
  footnote?: string
}

const BOOKING_TREATMENTS: Treatment[] = [
  { id: '30', category: 'Massage Therapy', label: '30 Minute Massage', description: 'A half hour Registered Massage Therapy visit with an RMT.', duration: 30, price: 60 },
  { id: '60', category: 'Massage Therapy', label: '60 Minute Massage', description: 'A one hour Registered Massage Therapy visit with an RMT.', duration: 60, price: 100, hasAddOns: true },
  { id: '90', category: 'Massage Therapy', label: '90 Minute Massage', description: 'An hour and a half Registered Massage Therapy visit with an RMT.', duration: 90, price: 125 },
  { id: '120', category: 'Massage Therapy', label: '2 Hour Massage', description: 'A 120 minute Registered Massage Therapy visit with an RMT. Offered only at the Village', duration: 120, price: 90 },
]

type DaySlots =
  | { kind: 'none' }
  | { kind: 'booked'; startHour: number; endHour: number }
  | { kind: 'slots'; slots: Array<{ time: string; extra?: number; bookedBefore?: boolean }>; bookedBands?: Array<{ row: number }> }

const SAMPLE_WEEK: { date: string; day: DaySlots }[] = [
  { date: 'Sun May 31', day: { kind: 'slots', slots: [
    { time: '9:30 AM PDT' },
    { time: '10:00 AM PDT', extra: 1 },
    { time: '11:00 AM PDT', extra: 1 },
    { time: '12:30 PM PDT' },
    { time: '2:15 PM PDT' },
    { time: '4:00 PM PDT' },
  ] } },
  { date: 'Mon Jun 1',   day: { kind: 'slots', slots: [
    { time: '11:00 AM PDT' },
  ] } },
  { date: 'Tue Jun 2',   day: { kind: 'slots', slots: [
    { time: '12:00 PM PDT', extra: 1 },
    { time: '2:00 PM PDT',  extra: 1 },
    { time: '4:00 PM PDT',  extra: 1, bookedBefore: true },
    { time: '5:30 PM PDT' },
  ] } },
  { date: 'Wed Jun 3',   day: { kind: 'slots', slots: [
    { time: '9:00 AM PDT' },
    { time: '10:45 AM PDT' },
    { time: '1:00 PM PDT',  extra: 1, bookedBefore: true },
    { time: '2:00 PM PDT',  extra: 1 },
  ] } },
  { date: 'Thu Jun 4',   day: { kind: 'booked', startHour: 10, endHour: 19 } },
  { date: 'Fri Jun 5',   day: { kind: 'none' } },
  { date: 'Sat Jun 6',   day: { kind: 'slots', slots: [
    { time: '9:00 AM PDT', extra: 1 },
    { time: '10:00 AM PDT', extra: 1 },
    { time: '11:30 AM PDT' },
    { time: '1:00 PM PDT',  extra: 1, bookedBefore: true },
    { time: '2:00 PM PDT',  extra: 1 },
    { time: '3:00 PM PDT' },
    { time: '4:00 PM PDT',  extra: 1 },
  ] } },
]

function BookingAppointmentPage({
  target, onBack, onAccount, onJaneClick,
}: { target: BookingTarget; onBack: () => void; onAccount: () => void; onJaneClick: () => void }) {
  const teal = vars.global.color.brand['70']
  const tealLight = '#7EC7C7'
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null)
  const treatmentSelected = selectedTreatment != null

  return (
    <div style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Top teal strip */}
      <div style={{
        background: teal, color: 'white',
        padding: '12px 32px',
        display: 'flex', alignItems: 'center', gap: 24,
      }}>
        <Text size="sm" style={{ color: 'white', flex: 1 }}>
          Welcome back Demo. You have 4 upcoming appointments.
        </Text>
        <button onClick={onAccount} style={transparentLink}>My Account</button>
        <button style={transparentLink}>Sign Out</button>
        <button
          onClick={onJaneClick}
          aria-label="Back to admin schedule"
          style={{
            ...transparentLink, fontStyle: 'italic', fontWeight: 700, fontSize: 20, lineHeight: 1,
          }}
        >Jane</button>
      </div>

      {/* Last-booked banner (only when no treatment selected) */}
      {!treatmentSelected && (
        <div style={{
          background: tealLight, color: 'white',
          padding: '14px 32px',
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
            <rect x="3" y="4" width="14" height="14" rx="1.5"/><path d="M3 8h14M7 2v3M13 2v3"/>
          </svg>
          <div style={{ flex: 1 }}>
            <Text size="sm" style={{ color: 'white', display: 'block', lineHeight: 1.45 }}>
              You last booked a 90 Minute Massage with {target.staff.name} at {target.locationName}. {target.staff.name.split(' ')[0]}'s next opening is Sunday May 31, 2026 at 9:30am PDT
            </Text>
            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedTreatment('30') }} style={{ color: 'white', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              View {target.staff.name.split(' ')[0]}'s Availability ›
            </a>
          </div>
        </div>
      )}

      {/* Clinic branding (only when no treatment selected) */}
      {!treatmentSelected && (
        <div style={{ padding: '28px 56px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontStyle: 'italic', fontWeight: 700, fontSize: 36, color: teal, lineHeight: 1 }}>Jane</div>
          <Text size="lg" style={{ color: '#9a9a9a', fontWeight: 400, fontSize: 26 }}>Demo Clinic</Text>
        </div>
      )}

      {/* Main card */}
      <div style={{ padding: treatmentSelected ? '0 56px 56px' : '0 56px 56px' }}>
        <div style={{ background: 'white', border: '1px solid #e2e2e2', borderRadius: 2 }}>
          {/* Header banner (only when no treatment selected) */}
          {!treatmentSelected && (
            <div style={{ background: teal, padding: '20px 28px' }}>
              <Heading level={1} style={{ margin: 0, color: 'white', fontWeight: 300, fontSize: 30 }}>
                Book an Appointment <span style={{ fontSize: 18, opacity: 0.9, fontWeight: 400 }}>at {target.locationName} - {target.locationArea}</span>
              </Heading>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0 }}>
            {/* Left column: practitioner + treatments */}
            <div style={{ padding: '24px 24px 32px', borderRight: '1px solid #f0f0f0' }}>
              <button onClick={onBack} style={{
                background: 'white', border: '1px solid #d0d0d0', borderRadius: 4,
                padding: '7px 12px', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 18,
              }}>
                <svg width="6" height="9" viewBox="0 0 6 9" fill="none" stroke="#444" strokeWidth="1.4"><path d="M5 1L1 4.5 5 8"/></svg>
                Back to Booking Page
              </button>

              <div style={{
                width: 100, height: 100, borderRadius: 4,
                background: target.staff.photo ? '#eef0f1' : 'linear-gradient(135deg, #C9D7DF, #8FA4B0)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, fontWeight: 600, letterSpacing: '-1px', marginBottom: 12,
                overflow: 'hidden',
              }}>
                {target.staff.photo
                  ? <img src={target.staff.photo} alt={target.staff.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : target.staff.initials}
              </div>

              <Heading level={2} style={{ margin: '0 0 2px' }}>{target.staff.name}</Heading>
              <Text size="sm" style={{ display: 'block', color: '#444', fontWeight: 500, marginBottom: 8 }}>{target.staff.credentials || ''}</Text>
              <Text size="sm" style={{ display: 'block', color: '#444', lineHeight: 1.5, marginBottom: 18 }}>
                {target.staff.bio}{' '}
                <a href="#" style={{ color: teal, textDecoration: 'none' }}>Read more</a>
              </Text>

              <Heading level={3} style={{ margin: '0 0 12px' }}>Select a treatment</Heading>
              <Heading level={4} style={{ margin: '0 0 10px', fontWeight: 600, fontSize: 14 }}>{target.staff.discipline.includes('Massage') ? 'Massage Therapy' : target.staff.discipline}</Heading>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {BOOKING_TREATMENTS.map(t => (
                  <TreatmentCard
                    key={t.id}
                    treatment={t}
                    selected={selectedTreatment === t.id}
                    onSelect={() => setSelectedTreatment(t.id)}
                  />
                ))}
              </div>

              {!treatmentSelected && (
                <div style={{ marginTop: 18 }}>
                  <Text size="sm" style={{ display: 'block', color: '#444', marginBottom: 8 }}>Can't find a time?</Text>
                  <a href="#" style={{ display: 'block', color: teal, fontSize: 13, textDecoration: 'underline', marginBottom: 8 }}>
                    See availability of all registered massage therapists (Massage Therapy).
                  </a>
                  <a href="#" style={{ display: 'block', color: teal, fontSize: 13, textDecoration: 'underline' }}>
                    Add yourself to {target.staff.name}'s wait list.
                  </a>
                </div>
              )}
            </div>

            {/* Right column: empty state OR calendar */}
            <div style={{ padding: '24px 28px 32px' }}>
              {treatmentSelected
                ? <AvailabilityCalendar />
                : <BookingEmptyState />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const transparentLink: React.CSSProperties = {
  background: 'transparent', border: 'none', color: 'white',
  fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0,
}

function TreatmentCard({
  treatment, selected, onSelect,
}: { treatment: Treatment; selected: boolean; onSelect: () => void }) {
  const teal = vars.global.color.brand['70']
  return (
    <div style={{
      border: `${selected ? 2 : 1}px solid ${selected ? teal : '#dcdcdc'}`,
      borderRadius: 4, padding: '12px 14px', cursor: 'pointer',
      background: 'white',
    }} onClick={onSelect}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{
          width: 16, height: 16, borderRadius: '50%',
          border: `1.5px solid ${selected ? teal : '#bbb'}`,
          background: 'white', flexShrink: 0, marginTop: 2,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {selected && <span style={{ width: 8, height: 8, borderRadius: '50%', background: teal }} />}
        </span>
        <div style={{ flex: 1 }}>
          <Text size="sm" style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>{treatment.label}</Text>
          <Text size="sm" style={{ display: 'block', color: '#555', marginBottom: 8, lineHeight: 1.4 }}>
            {treatment.description}
          </Text>
          <div style={{ display: 'flex', gap: 6 }}>
            <Pill text={`${treatment.duration} minutes`} tone="grey" />
            <Pill text={`$${treatment.price.toFixed(2)}`} tone="grey" />
          </div>
          {treatment.hasAddOns && (
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
              <a href="#" onClick={e => e.stopPropagation()} style={{ color: teal, fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                View add-ons
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l3.5 3.5L8 1"/></svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function BookingEmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
      <Text size="md" style={{ display: 'block', marginBottom: 24 }}>
        <strong>Select a treatment</strong> from the list on the left<br />
        to view available appointment times
      </Text>
      <svg width="320" height="220" viewBox="0 0 320 220" fill="none" style={{ opacity: 0.18 }}>
        <rect x="40" y="50" width="220" height="140" rx="6" stroke="#999" strokeWidth="2"/>
        <rect x="40" y="50" width="220" height="20" rx="6" fill="#999"/>
        <rect x="60" y="90" width="180" height="14" rx="2" fill="#bbb"/>
        <rect x="60" y="110" width="60" height="50" rx="2" fill="#bbb"/>
        <rect x="130" y="110" width="60" height="50" rx="2" fill="#bbb"/>
        <rect x="200" y="110" width="40" height="50" rx="2" fill="#bbb"/>
        <circle cx="250" cy="170" r="22" stroke="#999" strokeWidth="2"/>
        <path d="M250 158v12l8 6" stroke="#999" strokeWidth="2"/>
      </svg>
    </div>
  )
}

function AvailabilityCalendar() {
  const teal = vars.global.color.brand['70']
  const hatched = 'repeating-linear-gradient(135deg, #e8e8e8 0 2px, #f4f4f4 2px 8px)'
  const HOURS_CAL = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const ROW = 50

  // Edge case: Mon Jun 1 has only one slot. Clicking it shows the "no longer
  // available" modal (race condition with another patient claiming the cap).
  // After dismissal, the slot flips to a "Booked" gray band.
  const EDGE_DATE = 'Mon Jun 1'
  const [takenSlots, setTakenSlots] = useState<Set<string>>(new Set())
  const { state: capState, modalProps: capModalProps } = useModal()
  const pendingRef = React.useRef<string | null>(null)

  const slotId = (date: string, time: string) => `${date}::${time}`
  const handleSlotClick = (date: string, time: string) => {
    const id = slotId(date, time)
    if (takenSlots.has(id)) return
    if (date === EDGE_DATE) {
      pendingRef.current = id
      capState.open()
    }
  }
  const handleCapModalClose = () => {
    if (pendingRef.current) {
      const id = pendingRef.current
      setTakenSlots(prev => { const n = new Set(prev); n.add(id); return n })
      pendingRef.current = null
    }
    capState.close()
  }

  function rowForTime(t: string): number {
    const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (!m) return 0
    let h = parseInt(m[1], 10)
    const min = parseInt(m[2], 10)
    const period = m[3].toUpperCase()
    if (period === 'PM' && h !== 12) h += 12
    if (period === 'AM' && h === 12) h = 0
    return ((h - 8) + min / 60)
  }

  return (
    <div>
      {/* Calendar header: prev / range / next */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
        <button style={calNavBtn}>
          <svg width="6" height="9" viewBox="0 0 6 9" fill="none" stroke="#444" strokeWidth="1.4"><path d="M5 1L1 4.5 5 8"/></svg>
          Previous 7 Days
        </button>
        <div style={{ flex: 1, textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Heading level={2} style={{ margin: 0, fontWeight: 500 }}>Sun May 31 - Sat Jun 6</Heading>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={teal} strokeWidth="1.5"><rect x="2" y="3" width="14" height="13" rx="1.5"/><path d="M2 7h14M6 1v3M12 1v3"/></svg>
        </div>
        <button style={calNavBtn}>
          Next 7 Days
          <svg width="6" height="9" viewBox="0 0 6 9" fill="none" stroke="#444" strokeWidth="1.4"><path d="M1 1l4 3.5L1 8"/></svg>
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <Text size="sm" style={{ color: '#555' }}>
          Vancouver - America (GMT -07:00){' '}
          <a href="#" style={{ color: teal, textDecoration: 'none', marginLeft: 4 }}>Change Time Zone</a>
        </Text>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(7, 1fr)', gap: 4 }}>
        {/* Day headers */}
        <div />
        {SAMPLE_WEEK.map(d => (
          <div key={d.date} style={{ textAlign: 'center', color: teal, fontWeight: 500, fontSize: 13, marginBottom: 8 }}>
            {d.date}
          </div>
        ))}

        {/* Hour labels column */}
        <div style={{ position: 'relative' }}>
          {HOURS_CAL.map((h, i) => (
            <div key={h} style={{
              position: 'absolute', top: i * ROW - 6, left: 0,
              fontSize: 11, color: '#888',
            }}>{formatHourLabel(h)}</div>
          ))}
          <div style={{ height: HOURS_CAL.length * ROW }} />
        </div>

        {/* Day columns */}
        {SAMPLE_WEEK.map(d => (
          <div key={d.date} style={{
            position: 'relative', height: HOURS_CAL.length * ROW,
            background: d.day.kind === 'none' ? '#ececec' : hatched,
            borderRadius: 2,
          }}>
            {d.day.kind === 'none' && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#555', fontSize: 13, fontWeight: 500,
              }}>No Availability</div>
            )}

            {d.day.kind === 'booked' && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#2C2C2C', fontSize: 14, fontWeight: 500,
              }}>Booked</div>
            )}

            {d.day.kind === 'slots' && (
              d.day.slots.map((s, idx) => {
                const top = rowForTime(s.time) * ROW
                const id = slotId(d.date, s.time)
                const taken = takenSlots.has(id)
                return (
                  <React.Fragment key={idx}>
                    {s.bookedBefore && (
                      <div style={{
                        position: 'absolute', top: top - 26, left: 4, right: 4,
                        textAlign: 'center', fontSize: 14, fontWeight: 500, color: '#2C2C2C',
                      }}>Booked</div>
                    )}
                    {taken ? (
                      <div style={{
                        position: 'absolute', top, left: 2, right: 2, height: ROW - 4,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#2C2C2C', fontSize: 13, fontWeight: 500,
                      }}>Booked</div>
                    ) : (
                      <button
                        onClick={() => handleSlotClick(d.date, s.time)}
                        style={{
                          position: 'absolute', top, left: 2, right: 2, height: ROW - 4,
                          background: teal, border: 'none', borderRadius: 2,
                          color: 'white', fontFamily: 'inherit', cursor: 'pointer',
                          padding: '6px 8px', display: 'flex', flexDirection: 'column',
                          justifyContent: 'space-between', alignItems: 'flex-start',
                          textAlign: 'left',
                        }}>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>{s.time}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', fontSize: 10 }}>
                          {s.extra ? <span>+ {s.extra} more</span> : <span />}
                          <svg width="6" height="9" viewBox="0 0 6 9" fill="none" stroke="white" strokeWidth="1.4"><path d="M1 1l4 3.5L1 8"/></svg>
                        </div>
                      </button>
                    )}
                  </React.Fragment>
                )
              })
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 22 }}>
        <Text size="sm" style={{ color: '#444' }}>
          Can't find a time? <a href="#" style={{ color: teal, textDecoration: 'underline' }}>Add yourself to the wait list.</a>
        </Text>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <span style={legendChip('#e8e8e8', '#666')}>Unavailable</span>
        <span style={legendChip(teal, 'white')}>Available</span>
      </div>

      <Modal state={capState} {...capModalProps} size="md">
        <Modal.Header>
          <Modal.Title>This time is no longer available.</Modal.Title>
          <Modal.CloseButton onClick={handleCapModalClose} />
        </Modal.Header>
        <Modal.Content>
          <Text style={{ margin: 0 }}>
            Sorry, this appointment time is no longer available. Please select a different time.
          </Text>
        </Modal.Content>
        <Modal.Footer>
          <PrimaryButton onClick={handleCapModalClose}>Select a new time</PrimaryButton>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

function formatHourLabel(h: number): string {
  const period = h >= 12 ? 'pm' : 'am'
  const d = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${d}${period}`
}

const calNavBtn: React.CSSProperties = {
  background: 'white', border: '1px solid #d0d0d0', borderRadius: 4,
  padding: '7px 12px', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 6,
}

function legendChip(bg: string, fg: string): React.CSSProperties {
  return {
    background: bg, color: fg, fontSize: 11, fontWeight: 500,
    padding: '3px 10px', borderRadius: 12,
  }
}

/* ─────────────────────────────────────────────────────────────────
 *  MOBILE SCHEDULE
 * ───────────────────────────────────────────────────────────────── */

function MobileSchedule({
  practitioners, susanCap, modalState, modalProps,
  panelOpen, panelPractitioner, panelTime,
  formTreatment, setFormTreatment,
  formPatient, setFormPatient,
  formNotes, setFormNotes,
  openPanel, closePanel,
  handleBookAppointment, commitBooking,
}: {
  practitioners: Practitioner[]
  susanCap: number
  modalState: ReturnType<typeof useModal>['state']
  modalProps: ReturnType<typeof useModal>['modalProps']
  panelOpen: boolean
  panelPractitioner: string | null
  panelTime: number | null
  formTreatment: string; setFormTreatment: (v: string) => void
  formPatient: string;   setFormPatient:  (v: string) => void
  formNotes: string;     setFormNotes:    (v: string) => void
  openPanel: (pName: string, hour: number) => void
  closePanel: () => void
  handleBookAppointment: () => void
  commitBooking: () => void
}) {
  const COL_WIDTH = 180
  const HOUR_COL_WIDTH = 50
  const teal = vars.global.color.brand['70']
  const teal20 = vars.global.color.brand['20']

  // Group practitioners by discipline so we can render the discipline header spanning their columns
  const groups: { discipline: string; start: number; count: number }[] = []
  practitioners.forEach((p, i) => {
    const last = groups[groups.length - 1]
    if (last && last.discipline === p.discipline) last.count += 1
    else groups.push({ discipline: p.discipline, start: i, count: 1 })
  })

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', background: 'white' }}>
      {/* Mobile top header */}
      <header style={{
        background: teal, color: 'white',
        height: 56, padding: '0 12px', flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <button style={{
          background: 'transparent', border: 'none', color: 'white',
          fontSize: 15, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 2,
          padding: 0, cursor: 'pointer',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4l-6 6 6 6"/></svg>
          Back
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontStyle: 'italic', fontWeight: 600, fontSize: 22 }}>Jane</div>
        <button style={{
          width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.18)',
          border: 'none', color: 'white', fontWeight: 700, cursor: 'pointer',
        }}>?</button>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: teal20, color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>DO</div>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="white" strokeWidth="1.8"><path d="M1 1l4 4 4-4"/></svg>
        </div>
      </header>

      {/* Schedule content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto' }}>
        <div style={{ width: HOUR_COL_WIDTH + COL_WIDTH * practitioners.length, minWidth: '100%' }}>
          {/* Date row */}
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #f0f0f0' }}>
            <Text size="sm" style={{ color: '#E8A33D', fontWeight: 600, display: 'block', lineHeight: 1.2 }}>Today</Text>
            <Text size="sm" style={{ color: '#E8A33D', fontWeight: 600 }}>May 22, 2026</Text>
          </div>

          {/* Discipline header row */}
          <div style={{ display: 'grid', gridTemplateColumns: `${HOUR_COL_WIDTH}px repeat(${practitioners.length}, ${COL_WIDTH}px)`, borderBottom: '1px solid #f0f0f0' }}>
            <div />
            {groups.map(g => (
              <div key={g.discipline + g.start} style={{
                gridColumn: `span ${g.count}`,
                padding: '8px 10px',
              }}>
                <Text size="sm" style={{ color: teal, fontWeight: 500 }}>{g.discipline}</Text>
              </div>
            ))}
          </div>

          {/* Practitioner header row */}
          <div style={{ display: 'grid', gridTemplateColumns: `${HOUR_COL_WIDTH}px repeat(${practitioners.length}, ${COL_WIDTH}px)`, borderBottom: '1px solid #e2e2e2' }}>
            <div />
            {practitioners.map(p => (
              <div key={p.name} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                borderRight: '1px solid #f0f0f0',
              }}>
                <Avatar initials={p.initials} size={26} />
                <Text size="sm" style={{ flex: 1, color: teal, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</Text>
                {p.cap != null && <AvailabilityBadge cap={p.cap} booked={p.booked} />}
                <WaitlistBadge count={p.waitlist} />
              </div>
            ))}
          </div>

          {/* Time grid */}
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: `${HOUR_COL_WIDTH}px repeat(${practitioners.length}, ${COL_WIDTH}px)` }}>
            <div>
              {HOURS.map(h => (
                <div key={h} style={{ height: ROW_HEIGHT, borderBottom: '1px solid #f0f0f0', padding: '4px 6px', boxSizing: 'border-box' }}>
                  <Text size="sm" style={{ color: '#777', lineHeight: 1.1, fontSize: 11 }}>{formatHour(h)}</Text>
                </div>
              ))}
            </div>
            {practitioners.map(p => {
              const reservedDuration = TREATMENTS.find(t => t.id === formTreatment)?.duration ?? 0.25
              const reservedSlot = panelOpen && panelPractitioner === p.name && panelTime != null
                ? { startHour: panelTime, duration: reservedDuration }
                : null
              return (
                <PractitionerSchedule
                  key={p.name}
                  p={p}
                  onSlotClick={hour => openPanel(p.name, hour)}
                  reservedSlot={reservedSlot}
                />
              )
            })}
            <CurrentTimeMarker hour={13.27} />
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div style={{
        flexShrink: 0, background: 'white', borderTop: '1px solid #e2e2e2',
        padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Button>‹</Button>
        <Button>›</Button>
        <Button>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="3"/><path d="M7 1v2M7 11v2M1 7h2M11 7h2"/></svg>
            Today
          </span>
        </Button>
        <Button>Shifts</Button>
        <div style={{ flex: 1 }} />
        <button style={iconBtn}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#444" strokeWidth="1.4"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M2 6h12M5 1v3M11 1v3"/></svg>
        </button>
        <button style={iconBtn}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#444" strokeWidth="1.4"><circle cx="8" cy="8" r="2.4"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M3.2 12.8l1.4-1.4M11.4 4.6l1.4-1.4"/></svg>
        </button>
      </div>

      {/* Bottom tab nav */}
      <nav style={{
        flexShrink: 0, background: teal, color: 'white',
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        padding: '6px 0 8px',
      }}>
        {[
          { label: 'Schedule', icon: 'cal' },
          { label: 'Patients', icon: 'users' },
          { label: 'Staff',    icon: 'user' },
          { label: 'Billing',  icon: 'dollar' },
          { label: 'Reports',  icon: 'chart' },
        ].map((t, i) => (
          <div key={t.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            fontSize: 10, fontWeight: 500, opacity: i === 0 ? 1 : 0.85,
          }}>
            <TabIcon name={t.icon} />
            {t.label}
          </div>
        ))}
      </nav>

      {/* New appointment panel — slides up as bottom sheet */}
      {panelOpen && panelPractitioner && panelTime != null && (
        <div onClick={closePanel} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          zIndex: 100, display: 'flex', alignItems: 'flex-end',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxHeight: '85vh', background: '#f4f4f4',
            borderTopLeftRadius: 14, borderTopRightRadius: 14, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              <div style={{ width: '100%' }}>
                <NewAppointmentPanel
                  practitioner={panelPractitioner}
                  time={panelTime}
                  treatment={formTreatment}
                  setTreatment={setFormTreatment}
                  patient={formPatient}
                  setPatient={setFormPatient}
                  notes={formNotes}
                  setNotes={setFormNotes}
                  onClose={closePanel}
                  onBook={handleBookAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal state={modalState} {...modalProps} size="md">
        <Modal.Header>
          <Modal.Title>This practitioner has reached their daily booking limit</Modal.Title>
          <Modal.CloseButton onClick={modalState.close} />
        </Modal.Header>
        <Modal.Content>
          <Text style={{ margin: 0 }}>
            Susan Lo has reached their daily limit of {susanCap} appointments.
            Online booking is paused for today, but you can still add this appointment manually.
          </Text>
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={modalState.close}>Cancel</Button>
          <PrimaryButton onClick={commitBooking}>Book Anyway</PrimaryButton>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const iconBtn: React.CSSProperties = {
  width: 32, height: 32, border: '1px solid #ddd', background: 'white',
  borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', padding: 0,
}

function TabIcon({ name }: { name: string }) {
  const stroke = 'white'
  const s = { stroke, fill: 'none', strokeWidth: 1.5 } as const
  switch (name) {
    case 'cal':    return <svg width="18" height="18" viewBox="0 0 18 18" {...s}><rect x="2" y="4" width="14" height="12" rx="1.5"/><path d="M2 7h14M6 2v3M12 2v3"/></svg>
    case 'users':  return <svg width="20" height="18" viewBox="0 0 20 18" {...s}><circle cx="7" cy="6" r="2.5"/><circle cx="14" cy="7" r="2"/><path d="M2 15c0-2.5 2.2-4 5-4s5 1.5 5 4M11 15c0-1.7 1.4-3 3-3s3 1.3 3 3"/></svg>
    case 'user':   return <svg width="16" height="18" viewBox="0 0 16 18" {...s}><circle cx="8" cy="6" r="3"/><path d="M2 16c0-3 2.7-5 6-5s6 2 6 5"/></svg>
    case 'dollar': return <svg width="14" height="18" viewBox="0 0 14 18" {...s}><path d="M7 2v14M10.5 5.5c0-1.4-1.6-2.5-3.5-2.5s-3.5 1.1-3.5 2.5S5.1 8 7 8s3.5 1.1 3.5 2.5S8.9 13 7 13s-3.5-1.1-3.5-2.5"/></svg>
    case 'chart':  return <svg width="18" height="18" viewBox="0 0 18 18" {...s}><path d="M2 15V8M7 15V4M12 15v-5M2 15h14"/></svg>
    default: return null
  }
}

function formatHour(h: number): string {
  const hour = Math.floor(h)
  const minutes = Math.round((h % 1) * 60)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${String(minutes).padStart(2, '0')} ${period}`
}

function PractitionerSchedule({
  p, onSlotClick, reservedSlot,
}: {
  p: Practitioner
  onSlotClick: (hour: number) => void
  reservedSlot: { startHour: number; duration: number } | null
}) {
  return (
    <div style={{ position: 'relative', borderRight: '1px solid #e2e2e2' }}>
      {HOURS.map(h => (
        <div
          key={h}
          onClick={(e) => { e.stopPropagation(); onSlotClick(h) }}
          style={{ height: ROW_HEIGHT, borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
        />
      ))}

      {p.appts.map((a, i) => <AppointmentBlock key={i} appt={a} />)}

      {reservedSlot && <ReservedBlock startHour={reservedSlot.startHour} duration={reservedSlot.duration} />}
    </div>
  )
}

function ReservedBlock({ startHour, duration }: { startHour: number; duration: number }) {
  const top = (startHour - HOUR_START) * ROW_HEIGHT
  const height = duration * ROW_HEIGHT
  return (
    <div style={{
      position: 'absolute', top, height, left: 2, right: 2,
      background: '#dcdcdc', border: '1px dashed #999', borderRadius: 3,
      padding: '5px 7px', fontSize: 11, lineHeight: 1.25,
      display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'none',
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 16, height: 16, borderRadius: 2, background: 'white', border: '1px solid #999', flexShrink: 0,
      }}>
        <svg width="10" height="7" viewBox="0 0 10 7" stroke="#444" strokeWidth="1.6" fill="none"><path d="M1 3.5l2.5 2.5L9 1"/></svg>
      </span>
      <span style={{ fontWeight: 600, color: '#444' }}>{formatHour(startHour)} -</span>
      <span style={{
        background: '#9c9c9c', color: 'white', fontSize: 10, fontWeight: 600,
        padding: '2px 7px', borderRadius: 2,
      }}>Reserved</span>
    </div>
  )
}

function AppointmentBlock({ appt }: { appt: Appt }) {
  const top = (appt.startHour - HOUR_START) * ROW_HEIGHT
  const height = (appt.endHour - appt.startHour) * ROW_HEIGHT
  const colors = {
    teal:     { bg: '#a9dadc', text: '#0d3a3c' },
    darkTeal: { bg: '#bfafd4', text: '#3d2b5a' },
    green:    { bg: '#84c5a8', text: '#0c3a26' },
  }[appt.color ?? 'teal']
  return (
    <div style={{
      position: 'absolute', top, height, left: 2, right: 2,
      background: colors.bg, color: colors.text,
      borderRadius: 3, padding: '5px 7px', fontSize: 11, lineHeight: 1.25, overflow: 'hidden',
    }}>
      <div style={{ fontWeight: 600 }}>{formatHour(appt.startHour)} - {formatHour(appt.endHour)}</div>
      <div><strong>{appt.patient}</strong> - {appt.treatment}</div>
      {appt.insurance && (
        <div style={{ marginTop: 4 }}>
          <span style={{
            background: 'rgba(0,0,0,0.15)', color: colors.text,
            fontSize: 9.5, padding: '1px 5px', borderRadius: 2, display: 'inline-block',
          }}>{appt.insurance}</span>
        </div>
      )}
    </div>
  )
}

function CurrentTimeMarker({ hour }: { hour: number }) {
  const top = (hour - HOUR_START) * ROW_HEIGHT
  return (
    <div style={{ position: 'absolute', top, left: 0, right: 0, pointerEvents: 'none', zIndex: 5 }}>
      <div style={{ position: 'relative', height: 0 }}>
        <div style={{
          position: 'absolute', left: 0,
          background: '#2C2C2C', color: 'white',
          fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 2,
          top: -10, width: 50, textAlign: 'center',
        }}>1:16 PM</div>
        <div style={{ position: 'absolute', left: 60, right: 0, height: 1, background: '#2C2C2C' }} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  NEW APPOINTMENT SIDE PANEL
 * ───────────────────────────────────────────────────────────────── */

function NewAppointmentPanel({
  practitioner, time, treatment, setTreatment, patient, setPatient, notes, setNotes,
  onClose, onBook,
}: {
  practitioner: string
  time: number
  treatment: string
  setTreatment: (v: string) => void
  patient: string
  setPatient: (v: string) => void
  notes: string
  setNotes: (v: string) => void
  onClose: () => void
  onBook: () => void
}) {
  const tr = TREATMENTS.find(t => t.id === treatment)
  const endTime = time + (tr?.duration ?? 0.25)
  return (
    <aside style={{
      width: 360, background: '#f4f4f4', borderLeft: '1px solid #e2e2e2',
      display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto',
    }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <Heading level={2} style={{ margin: 0, flex: 1 }}>New Appointment</Heading>
        <button
          onClick={onClose}
          aria-label="Close panel"
          style={{
            width: 28, height: 28, borderRadius: 4, border: '1px solid #ddd',
            background: 'white', cursor: 'pointer', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" stroke="#444" strokeWidth="1.5"><path d="M1 1l8 8M9 1L1 9"/></svg>
        </button>
      </div>

      <div style={{ padding: '0 16px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Heading level={3} style={{ margin: 0, flex: 1 }}>Booking Info</Heading>
        <PrimaryButton onClick={onBook}>Book Appointment</PrimaryButton>
      </div>

      <PanelSection title="Treatment">
        <Select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          placeholder="Select a treatment..."
          aria-label="Treatment"
        >
          {TREATMENTS.map(t => (
            <Select.Option key={t.id} value={t.id}>{t.label}</Select.Option>
          ))}
        </Select>
      </PanelSection>

      <PanelSection title="Patient" action={<Button>New Patient</Button>}>
        <PatientSearch patient={patient} setPatient={setPatient} />
      </PanelSection>

      <PanelSection title="Packages & Memberships">
        <Text size="sm" style={{ color: '#666' }}>No Packages/Memberships</Text>
      </PanelSection>

      <PanelSection title="Time">
        <div style={{
          background: 'white', border: '1px solid #c8c8c8', borderRadius: 4, padding: '8px 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Text size="sm">{formatHour(time)}</Text>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#444" strokeWidth="1.5"><path d="M1 1l4 4 4-4"/></svg>
        </div>
        <Text size="sm" style={{ display: 'block', color: '#666', marginTop: 6 }}>
          Fri, May 22, 2026 {formatHour(time)} - {formatHour(endTime)}
        </Text>
      </PanelSection>

      <PanelSection title="Staff Member">
        <Text size="sm">{practitioner}</Text>
      </PanelSection>

      <PanelSection title="Resources">
        <Text size="sm" style={{ color: '#666' }}>No resources required</Text>
      </PanelSection>

      <PanelSection title="Notes" noBorder>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add Note..."
          rows={3}
          style={{
            width: '100%', boxSizing: 'border-box',
            background: 'white', border: '1px solid #c8c8c8', borderRadius: 4,
            padding: '8px 10px', fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none',
          }}
        />
      </PanelSection>

      <div style={{ padding: '14px 16px', borderTop: '1px solid #e2e2e2', background: 'white', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button onClick={onClose}>Cancel</Button>
        <PrimaryButton onClick={onBook}>Book Appointment</PrimaryButton>
      </div>
    </aside>
  )
}

function PatientSearch({ patient, setPatient }: { patient: string; setPatient: (v: string) => void }) {
  const [query, setQuery] = useState(patient)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selected, setSelected] = useState(!!patient)

  React.useEffect(() => {
    setQuery(patient)
    setSelected(!!patient)
  }, [patient])

  const matches = query.trim()
    ? PATIENTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : []

  const handlePick = (name: string) => {
    setPatient(name)
    setQuery(name)
    setSelected(true)
    setShowSuggestions(false)
  }

  const handleClear = () => {
    setPatient('')
    setQuery('')
    setSelected(false)
    setShowSuggestions(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <Text size="sm" style={{ display: 'block', color: '#666', marginBottom: 4 }}>Add Patient</Text>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'white', border: '1px solid #c8c8c8', borderRadius: 4, padding: '7px 10px',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#999" strokeWidth="1.5">
          <circle cx="6" cy="6" r="4.5"/><path d="M9.5 9.5L13 13"/>
        </svg>
        <input
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelected(false)
            setShowSuggestions(true)
            if (!e.target.value) setPatient('')
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Add Patient..."
          style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit' }}
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label="Clear patient"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: 0 }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l8 8M9 1L1 9"/></svg>
          </button>
        )}
      </div>

      {/* Suggestion dropdown */}
      {showSuggestions && matches.length > 0 && !selected && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          background: 'white', border: '1px solid #c8c8c8', borderRadius: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)', zIndex: 30,
          maxHeight: 220, overflowY: 'auto',
        }}>
          {matches.map(p => (
            <button
              key={p.name}
              onMouseDown={(e) => { e.preventDefault(); handlePick(p.name) }}
              style={{
                width: '100%', textAlign: 'left', background: 'white',
                border: 'none', borderBottom: '1px solid #f0f0f0',
                padding: '8px 12px', cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', flexDirection: 'column', gap: 2,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>{p.name}</span>
              <span style={{ fontSize: 11, color: '#777' }}>{p.detail}</span>
            </button>
          ))}
        </div>
      )}

      {!patient && (
        <Text size="sm" style={{ display: 'block', color: '#888', marginTop: 6, fontStyle: 'italic' }}>
          No patient selected...
        </Text>
      )}
    </div>
  )
}

function PanelSection({
  title, action, children, noBorder,
}: { title: string; action?: React.ReactNode; children: React.ReactNode; noBorder?: boolean }) {
  return (
    <div style={{
      background: 'white',
      borderTop: '1px solid #e2e2e2',
      borderBottom: noBorder ? 'none' : '1px solid #e2e2e2',
      marginBottom: noBorder ? 0 : -1,
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <Heading level={3} style={{ margin: 0, flex: 1 }}>{title}</Heading>
        {action}
      </div>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  Availability + Waitlist badges
 * ───────────────────────────────────────────────────────────────── */

function useNarrowScreen(breakpoint = 768) {
  const [narrow, setNarrow] = useState(
    typeof window !== 'undefined' && window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  )
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handler = (e: MediaQueryListEvent) => setNarrow(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return narrow
}

function AvailabilityBadge({ cap, booked }: { cap: number; booked: number }) {
  const full = booked >= cap
  const [open, setOpen] = useState(false)
  const narrow = useNarrowScreen()
  const tooltip = full
    ? `${booked} out of ${cap} booked, daily cap reached. Online booking is paused for today.`
    : `${booked} of ${cap} booked. ${cap - booked} slots open.`
  const label = full ? 'Full' : narrow ? `${booked}/${cap}` : `${booked}/${cap} booked`
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ position: 'relative', display: 'inline-flex' }}
    >
      <span style={{
        display: 'inline-block',
        fontSize: narrow ? 12 : 11,
        fontWeight: 600,
        padding: narrow ? '4px 12px' : '2px 9px',
        borderRadius: narrow ? 14 : 12,
        background: full ? '#eaeaea' : '#ADECEE',
        color: full ? '#444' : '#2C2C2C',
        cursor: 'help', whiteSpace: 'nowrap', lineHeight: 1.5,
      }}>{label}</span>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
          background: '#2C2C2C', color: 'white',
          padding: '10px 14px', borderRadius: 6,
          fontSize: 12, width: 220, textAlign: 'center',
          zIndex: 20, boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
          pointerEvents: 'none', lineHeight: 1.45,
        }}>{tooltip}</div>
      )}
    </div>
  )
}

function WaitlistBadge({ count }: { count: number }) {
  return (
    <div style={{
      width: 24, height: 24, borderRadius: '50%',
      background: count > 0 ? '#D4AB3F' : '#E0E0E0',
      color: count > 0 ? 'white' : '#888',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 600, flexShrink: 0,
    }}>{count}</div>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  Schedule sidebar
 * ───────────────────────────────────────────────────────────────── */

function ScheduleSidebar() {
  return (
    <aside style={{
      width: 240, background: 'white', borderRight: '1px solid #e2e2e2',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      <div style={{ padding: 12, borderBottom: '1px solid #eee' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#f5f5f5', borderRadius: 4, padding: '7px 10px',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#999" strokeWidth="1.5">
            <circle cx="6" cy="6" r="4.5"/><path d="M9.5 9.5L13 13"/>
          </svg>
          <input
            placeholder="Patient Search..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, flex: 1, fontFamily: 'inherit' }}
          />
        </div>
        <div style={{ textAlign: 'center', padding: '10px 0 4px', fontSize: 13, color: vars.global.color.brand['70'], display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
          The Village
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke={vars.global.color.brand['70']} strokeWidth="1.5"><path d="M1 1l3 3 3-3"/></svg>
        </div>
        <div style={{ textAlign: 'center', padding: '4px 0', fontSize: 13, color: '#444', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
          All Staff
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="#666" strokeWidth="1.5"><path d="M1 1l3 3 3-3"/></svg>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {STAFF.map(s => {
          const [first, ...rest] = s.name.split(' ')
          const last = rest.join(' ')
          return (
            <div key={s.name} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
              borderBottom: '1px solid #f3f3f3', cursor: 'pointer',
            }}>
              <Avatar initials={s.initials} size={28} />
              <Text size="sm" style={{ flex: 1 }}>{first} <strong>{last}</strong></Text>
            </div>
          )
        })}
      </div>

      <div style={{ padding: 12, borderTop: '1px solid #eee' }}>
        <Button>Break</Button>
      </div>
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────────────
 *  Small reusable bits
 * ───────────────────────────────────────────────────────────────── */

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'white', border: '1px solid #e2e2e2', borderRadius: 6, overflow: 'hidden' }}>{children}</div>
}

function ProfileTab({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? vars.global.color.brand['70'] : 'transparent',
        color: active ? 'white' : vars.global.color.brand['70'],
        border: 'none', fontFamily: 'inherit', fontSize: 13,
        padding: '6px 10px', borderRadius: 4, cursor: 'pointer',
        fontWeight: active ? 600 : 500, whiteSpace: 'nowrap',
      }}
    >{children}</button>
  )
}

function EditTab({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button style={{
      background: active ? vars.global.color.brand['70'] : 'transparent',
      color: active ? 'white' : vars.global.color.brand['70'],
      border: 'none', fontFamily: 'inherit', fontSize: 13,
      padding: '8px 16px', borderRadius: 4, cursor: 'pointer',
      fontWeight: active ? 600 : 500, whiteSpace: 'nowrap',
    }}>{children}</button>
  )
}

function ProfileRow({ label, children, icon }: { label: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'flex-start',
      padding: '12px 16px', borderBottom: '1px solid #f0f0f0', gap: 12,
    }}>
      <Text size="sm" style={{ color: '#444', fontWeight: 600 }}>{label}</Text>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {icon}{children}
      </div>
    </div>
  )
}

function Pill({ text, tone }: { text: string; tone: 'grey' | 'green' | 'yellow' }) {
  const colors = {
    grey:   { bg: '#e4e4e4', fg: '#555' },
    green:  { bg: '#cfe6d4', fg: '#2c6c4a' },
    yellow: { bg: '#fce7a0', fg: '#7a5a00' },
  }[tone]
  return (
    <span style={{
      background: colors.bg, color: colors.fg,
      fontSize: 11, fontWeight: 600,
      padding: '2px 8px', borderRadius: 10, whiteSpace: 'nowrap',
    }}>{text}</span>
  )
}

function HelpIcon() {
  return (
    <span style={{
      width: 16, height: 16, borderRadius: '50%', background: '#333', color: 'white',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700,
    }}>?</span>
  )
}
function HomeIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="#444"><path d="M7 1L0 7h2v6h3V9h4v4h3V7h2z"/></svg>
}
function MobileIcon() {
  return <svg width="10" height="14" viewBox="0 0 10 14" fill="#444"><rect x="1" y="0.5" width="8" height="13" rx="1.5" fill="none" stroke="#444"/><circle cx="5" cy="11" r="0.8"/></svg>
}
function ExternalLinkIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 2H2v8h8V7M7 1h4v4M11 1L6 6"/></svg>
}
function GoogleCalendarIcon() {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: 4, background: 'white',
      border: '1px solid #ddd', position: 'relative',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 10, fontWeight: 700, color: '#4285F4',
    }}>31</div>
  )
}
