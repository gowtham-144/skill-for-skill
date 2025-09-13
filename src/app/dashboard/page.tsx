'use client';

import { useState, useEffect } from "react";
import { Plus, Edit, Users, Star, Calendar, BookOpen, Clock, DollarSign } from "lucide-react";

interface Skill {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: string;
  students: number;
  rating: number;
  sessions: number;
  status: "active" | "draft";
}

interface Session {
  id: number;
  skill: string;
  student: string;
  time: string;
  status: "confirmed" | "pending";
}

const DashboardPage: React.FC = () => {
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);

  // Example: fetch skills from API
  useEffect(() => {
    const fetchData = async () => {
      const skillsRes = await fetch("/api/skills");
      const skillsData: Skill[] = await skillsRes.json();
      setMySkills(skillsData);

      const sessionsRes = await fetch("/api/sessions");
      const sessionsData: Session[] = await sessionsRes.json();
      setUpcomingSessions(sessionsData);
    };
    fetchData();
  }, []);

  return (
    <div className="pt-16 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Skills */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">My Skills</h2>
              <div className="text-sm text-gray-600">
                {mySkills.filter(skill => skill.status === 'active').length} active skills
              </div>
            </div>

            <div className="space-y-4">
              {mySkills.map(skill => (
                <div key={skill.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{skill.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          skill.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {skill.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{skill.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center"><BookOpen className="w-4 h-4 mr-1" />{skill.category}</div>
                        <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{skill.duration}</div>
                        <div className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />{skill.price}/session</div>
                        <div className="flex items-center"><Users className="w-4 h-4 mr-1" />{skill.students} students</div>
                      </div>
                    </div>

                    <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-yellow-600"><Star className="w-4 h-4 mr-1" />{skill.rating}</div>
                      <span className="text-gray-600">{skill.sessions} sessions completed</span>
                    </div>

                    <div className="flex space-x-2">
                      <button className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm">View Details</button>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">Manage</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Teaching Stats */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Teaching Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between"><span className="text-gray-600">Total Students</span><span className="font-semibold text-purple-600">56</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-600">Sessions Taught</span><span className="font-semibold text-purple-600">105</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-600">Average Rating</span><span className="font-semibold text-yellow-600 flex items-center"><Star className="w-4 h-4 mr-1" />4.8</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-600">Earnings This Month</span><span className="font-semibold text-green-600">$1,240</span></div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Upcoming Sessions</h3>
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div className="space-y-3">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{session.skill}</p>
                      <p className="text-xs text-gray-600">with {session.student}</p>
                      <p className="text-xs text-gray-500">{session.time}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      session.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center"><Calendar className="w-4 h-4 mr-3 text-purple-600" /><span className="text-sm">Schedule Session</span></button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center"><Users className="w-4 h-4 mr-3 text-purple-600" /><span className="text-sm">View Students</span></button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center"><Star className="w-4 h-4 mr-3 text-purple-600" /><span className="text-sm">View Reviews</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
