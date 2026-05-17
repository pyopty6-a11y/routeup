import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Users,
  MessageSquare,
  User,
  Plus,
  Search,
  Settings,
  Navigation,
  Heart,
  Share2,
  Bell,
  ChevronRight,
  Filter,
  CheckCircle2,
  Calendar,
  Compass,
  ShoppingBag,
  Zap,
  ArrowLeft,
  Trophy,
  Star
} from 'lucide-react';

const RANKS = ['Free Agency', 'Pro', 'Elite', 'King', 'God'];

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userState, setUserState] = useState({
    id: 'user-789',
    username: 'אבו דאבי',
    points: 1250,
    skin: 'default',
    ownedSkins: ['default'],
    aiUpgraded: false,
    maxClubs: 5,
    myClubsCount: 2,
    rankIndex: 1
  });

  const [activeClub, setActiveClub] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'מנהל המועדון', text: 'ברוכים הבאים למועדון! שתפו פה עומסי תנועה.', isMe: false }
  ]);
  const [aiMessages, setAiMessages] = useState([
    { id: 1, sender: 'AI Coach', text: `היי אבו דאבי! אני המאמן האישי שלך. מוכן לצאת לדרך?`, isAi: true }
  ]);

  const navigate = (view) => {
    setCurrentView(view);
    if (view !== 'clubs') setActiveClub(null);
  };

  const addPoints = (amount) => {
    setUserState(prev => ({ ...prev, points: prev.points + amount }));
  };

  const buyItem = (type, price) => {
    if (userState.points < price) {
      alert("אין לך מספיק נקודות!");
      return;
    }
    if (type === 'ai') {
      setUserState(prev => ({ ...prev, points: prev.points - price, aiUpgraded: true }));
      setAiMessages(prev => [...prev, { id: Date.now(), sender: 'System', text: 'שודרגת לגרסת PRO בהצלחה!', isAi: true }]);
    } else if (type === 'skin_gold') {
      setUserState(prev => ({
        ...prev,
        points: prev.points - price,
        ownedSkins: [...prev.ownedSkins, 'gold']
      }));
    }
  };

  const handleSendMessage = (text, isAiChat = false) => {
    if (!text.trim()) return;
    const newMessage = { id: Date.now(), sender: userState.username, text, isMe: true };
    if (isAiChat) {
      setAiMessages(prev => [...prev, newMessage]);
      setTimeout(() => {
        const reply = userState.aiUpgraded
          ? "ניתוח PRO: מומלץ לצאת עכשיו, יש עומס מתפתח בכביש 6."
          : "טיפ בסיסי: סע בזהירות ושמור מרחק.";
        setAiMessages(prev => [...prev, { id: Date.now() + 1, sender: 'AI Coach', text: reply, isAi: true }]);
      }, 1000);
    } else {
      setMessages(prev => [...prev, newMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 font-sans overflow-hidden" dir="rtl">

      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-4 flex justify-between items-center shrink-0 z-50">
        <div className="flex items-center gap-3">
          {currentView !== 'home' && (
            <button onClick={() => navigate('home')} className="p-2 hover:bg-slate-800 rounded-full text-indigo-400">
              <ArrowLeft size={24} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Navigation size={18} className="text-white" fill="currentColor" />
            </div>
            <span className="font-black tracking-tighter text-xl text-white uppercase">RouteUp</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800 px-3 py-1.5 rounded-full flex items-center gap-2 border border-slate-700">
            <span className="text-yellow-400 font-bold">{userState.points.toLocaleString()}</span>
            <span className="text-xs">💎</span>
          </div>
          <button
            onClick={() => navigate('profile')}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all ${userState.skin === 'gold' ? 'border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'border-slate-700'}`}
          >
            <User size={20} className={userState.skin === 'gold' ? 'text-yellow-400' : 'text-slate-400'} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative no-scrollbar">
        <div className="max-w-4xl mx-auto w-full h-full">
          {currentView === 'home' && <HomeView user={userState} navigate={navigate} />}
          {currentView === 'routes' && <RoutesView onFinish={() => addPoints(50)} />}
          {currentView === 'clubs' && (
            <ClubsView
              user={userState}
              activeClub={activeClub}
              setActiveClub={setActiveClub}
              messages={messages}
              onSend={handleSendMessage}
            />
          )}
          {currentView === 'ai' && (
            <AiCoachView
              user={userState}
              messages={aiMessages}
              onSend={(txt) => handleSendMessage(txt, true)}
            />
          )}
          {currentView === 'shop' && <ShopView user={userState} onBuy={buyItem} />}
          {currentView === 'profile' && <ProfileView user={userState} setUser={setUserState} />}
        </div>
      </main>

      {/* Progress Bar */}
      <div className="fixed top-[68px] left-0 right-0 h-0.5 bg-slate-800 z-40">
        <div className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" style={{ width: '45%' }}></div>
      </div>
    </div>
  );
}

function HomeView({ user, navigate }) {
  const menuItems = [
    { id: 'clubs', label: 'מועדונים', icon: <Users size={32} />, color: 'indigo', desc: `${user.myClubsCount} פעילים` },
    { id: 'routes', label: 'מסלולים', icon: <MapPin size={32} />, color: 'emerald', desc: 'צבור נקודות' },
    { id: 'ai', label: 'מאמן AI', icon: <Zap size={32} />, color: 'teal', desc: user.aiUpgraded ? 'PRO פעיל' : 'גרסה בסיסית' },
    { id: 'shop', label: 'חנות', icon: <ShoppingBag size={32} />, color: 'pink', desc: 'סקינים ושדרוגים' },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="text-right">
        <h2 className="text-3xl font-black text-white mb-1">אהלן, {user.username}</h2>
        <p className="text-slate-400">דרגת <span className="text-indigo-400 font-bold">{RANKS[user.rankIndex]}</span> | מוכן למסלול הבא?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col items-center text-center gap-3 transition-all hover:scale-[1.02] hover:border-${item.color}-500/50 active:scale-95 group shadow-xl`}
          >
            <div className={`p-4 rounded-2xl bg-${item.color}-500/10 text-${item.color}-500 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <div>
              <div className="font-bold text-lg">{item.label}</div>
              <div className="text-xs text-slate-500 font-medium">{item.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="text-yellow-400" size={20} />
            <span className="text-white font-bold uppercase text-xs tracking-widest">משימה יומית</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">סיים 3 מסלולים היום לקבלת בונוס 200💎</h3>
          <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden mb-4">
            <div className="bg-white h-full" style={{ width: '66%' }}></div>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold text-sm">המשך משימה</button>
        </div>
        <Navigation size={120} className="absolute -bottom-8 -left-8 text-white opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
      </div>
    </div>
  );
}

function RoutesView({ onFinish }) {
  const [isFinishing, setIsFinishing] = useState(false);

  const handleFinish = () => {
    setIsFinishing(true);
    setTimeout(() => {
      onFinish();
      setIsFinishing(false);
    }, 1500);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black italic">המסלול הנוכחי</h2>
        <span className="text-xs bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30 font-bold">פעיל כעת</span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex-1 flex flex-col gap-6 shadow-lg">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <div className="w-0.5 flex-1 bg-slate-700 my-1"></div>
              <div className="w-3 h-3 rounded-full border-2 border-slate-600"></div>
            </div>
            <div className="flex-1 space-y-8">
              <div>
                <div className="text-xs text-slate-500 font-bold">מוצא</div>
                <div className="text-lg font-bold">תל אביב, אבן גבירול 12</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-bold">יעד</div>
                <div className="text-lg font-bold">ירושלים, הגבעה הצרפתית</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-slate-800/50 rounded-2xl border border-slate-700 flex items-center justify-center relative overflow-hidden">
          <Compass size={60} className="text-slate-700 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent"></div>
        </div>

        <button
          onClick={handleFinish}
          disabled={isFinishing}
          className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${isFinishing ? 'bg-slate-700 text-slate-500' : 'bg-yellow-500 text-slate-900 hover:bg-yellow-400 active:scale-95'}`}
        >
          {isFinishing ? 'מעבד...' : (
            <>
              <CheckCircle2 size={24} />
              סיום מסלול (+50💎)
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ClubsView({ user, activeClub, setActiveClub, messages, onSend }) {
  const [inputText, setInputText] = useState('');
  const clubs = [
    { id: 1, name: 'נהגי המרכז', icon: '🏙️', members: 124 },
    { id: 2, name: 'חובבי שטח 4x4', icon: '🚜', members: 89 }
  ];

  if (!activeClub) {
    return (
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-black mb-4">המועדונים שלי</h2>
        {clubs.map(club => (
          <button
            key={club.id}
            onClick={() => setActiveClub(club)}
            className="w-full bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 hover:border-indigo-500 transition-all shadow-md group"
          >
            <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {club.icon}
            </div>
            <div className="flex-1 text-right">
              <div className="font-bold text-lg">{club.name}</div>
              <div className="text-xs text-slate-500 font-bold">{club.members} חברים פעילים</div>
            </div>
            <ChevronRight className="text-slate-700" />
          </button>
        ))}
        <button className="w-full py-4 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 font-bold hover:bg-slate-900 transition-colors mt-4">
          + מצא מועדון חדש
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveClub(null)} className="p-1 text-slate-400"><ArrowLeft size={20} /></button>
          <span className="font-bold text-lg">{activeClub.name}</span>
        </div>
        <button className="text-red-500 text-xs font-bold px-3 py-1 bg-red-500/10 rounded-lg">עזוב</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-start' : 'items-end'}`}>
            <span className="text-[10px] text-slate-500 font-bold mb-1 px-2">{msg.sender}</span>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-100 rounded-bl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="כתוב הודעה..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && (onSend(inputText), setInputText(''))}
        />
        <button
          onClick={() => { onSend(inputText); setInputText(''); }}
          className="bg-indigo-600 p-3 rounded-xl hover:bg-indigo-500 transition-colors"
        >
          <Navigation size={20} className="rotate-90" />
        </button>
      </div>
    </div>
  );
}

function AiCoachView({ user, messages, onSend }) {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-slate-950">
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${user.aiUpgraded ? 'bg-amber-500' : 'bg-teal-500'}`}>
            <Zap size={20} fill="white" className="text-white" />
          </div>
          <div>
            <div className="font-bold">מאמן AI {user.aiUpgraded ? 'PRO' : ''}</div>
            <div className="text-[10px] text-green-400 font-bold">מחובר ומנתח</div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl shadow-xl ${
              msg.isAi
                ? (user.aiUpgraded ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white' : 'bg-slate-800 text-slate-100')
                : 'bg-indigo-600 text-white'
            }`}>
              {msg.isAi && <div className="text-[10px] font-black uppercase mb-1 opacity-70">{msg.sender}</div>}
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-900/50">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="שאל את המאמן לעצה..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            onKeyDown={(e) => e.key === 'Enter' && (onSend(inputText), setInputText(''))}
          />
          <button
            onClick={() => { onSend(inputText); setInputText(''); }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            שלח
          </button>
        </div>
      </div>
    </div>
  );
}

function ShopView({ user, onBuy }) {
  const items = [
    { id: 'ai', name: 'AI COACH PRO', price: 800, icon: <Zap size={40} />, color: 'teal', desc: 'חיזוי פקקים, ניתוח נהיגה וטיפים לחיסכון בדלק.', active: user.aiUpgraded },
    { id: 'skin_gold', name: 'סקין: נהג זהב', price: 1000, icon: <Star size={40} />, color: 'amber', desc: 'מסגרת מוזהבת ויוקרתית לפרופיל שלך.', active: user.ownedSkins.includes('gold') }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-3xl font-black text-pink-500 italic uppercase">החנות</h2>
          <p className="text-slate-500 text-sm font-bold tracking-wide">שדרג את המעמד שלך</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center gap-4 relative overflow-hidden group shadow-2xl">
            <div className={`p-5 rounded-2xl bg-${item.color}-500/10 text-${item.color}-500 group-hover:rotate-12 transition-transform duration-500`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-black italic uppercase">{item.name}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            <button
              onClick={() => !item.active && onBuy(item.id, item.price)}
              disabled={item.active}
              className={`w-full py-4 rounded-xl font-black transition-all ${item.active ? 'bg-slate-800 text-slate-500' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 active:scale-95'}`}
            >
              {item.active ? 'כבר בבעלותך' : `קנה ב-${item.price}💎`}
            </button>
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${item.color}-500/5 blur-3xl rounded-full`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileView({ user, setUser }) {
  const [tempName, setTempName] = useState(user.username);

  const saveProfile = () => {
    setUser(prev => ({ ...prev, username: tempName }));
    alert("הפרופיל עודכן!");
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col items-center gap-6">
        <div className={`w-32 h-32 rounded-3xl border-4 flex items-center justify-center text-5xl font-black text-white bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-2xl ${user.skin === 'gold' ? 'border-yellow-400 animate-pulse' : 'border-slate-800'}`}>
          {user.username[0]}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black">{user.username}</h2>
          <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs mt-1">{RANKS[user.rankIndex]}</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase">שם משתמש</label>
          <input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-indigo-500 font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase">בחר סקין פעיל</label>
          <div className="flex gap-3">
            {user.ownedSkins.map(skin => (
              <button
                key={skin}
                onClick={() => setUser(prev => ({ ...prev, skin: skin }))}
                className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${user.skin === skin ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
              >
                {skin === 'default' ? 'רגיל' : 'מוזהב'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={saveProfile}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-black shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
        >
          שמור שינויים
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
          <div className="text-2xl font-black text-white">42</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase">מסלולים</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center">
          <div className="text-2xl font-black text-white">1,502</div>
          <div className="text-[10px] text-slate-500 font-bold uppercase">קילומטרים</div>
        </div>
      </div>
    </div>
  );
}
