"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    
    // Here you would add your registration logic
    // For example, call your API to register the user
    
    // For demo purposes, just redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleGoogleSignup = () => {
    // Implement Google OAuth signup
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleFacebookSignup = () => {
    // Implement Facebook OAuth signup
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col gap-[49px] items-center p-16 justify-center bg-[#ffff]">
      <div>
        <Image 
          src="/img/logobigw.png" 
          alt="FarmLand Logo" 
          width={198} 
          height={30} 
          className="mx-auto"
        />
      </div>
      
      <div className="w-full max-w-[580px] p-8 space-y-6 bg-white rounded-[16px] border-[1px] border-[#e8e8e8]">
        <div className="text-center">
          <h2 className="mt-2 text-[#606060] text-[32px] leading-[100%] font-normal font-sora">Create an account</h2>
          <p className="mt-2 text-sm font-sora text-[#606060] text-[16px] leading-[24px] font-normal">
            Sign up to get started with FarmLand
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={handleGoogleSignup}
              className="w-full max-w-[238px] heigth-[56px] flex items-center p-[8px] gap-[8px] justify-center px-1 border border-[#e0e0e0] rounded-[56px] bg-[#fafafa] hover:bg-gray-50 transition"
              disabled={isLoading}
            >
              <Image src="/icons/google.png" alt="Google" width={20} height={20} />
              <span className="font-sora text-[#4f4f4f] text-[16px] leading-[100%] font-normal">Signup with Google</span>
            </button>

            <button
              onClick={handleFacebookSignup}
              className="w-full max-w-[238px] heigth-[56px] flex items-center p-[8px] gap-[8px] justify-center px-1 border border-[#e0e0e0] rounded-[56px] bg-[#fafafa] hover:bg-gray-50 transition"
              disabled={isLoading}
            >
              <Image src="/icons/facebook.png" alt="Facebook" width={20} height={20} />
              <span className="font-sora text-[#4f4f4f] text-[16px] leading-[100%] font-normal">Signup with Facebook</span>
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or create an account with email</span>
            </div>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-[14px] leading-[100%] font-medium font-sora text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder='Enter your full name'
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-[14px] leading-[100%] font-medium font-sora text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder='Enter your email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-[14px] leading-[100%] font-medium font-sora text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder='Create a password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-[14px] leading-[100%] font-medium font-sora text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder='Confirm your password'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 font-sora">
                I agree to the <a href="#" className="text-[#1a382c] hover:text-[#2e6650]">Terms of Service</a> and <a href="#" className="text-[#1a382c] hover:text-[#2e6650]">Privacy Policy</a>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-[500px] height-[56px] flex justify-center py-2 px-4 border border-transparent rounded-[56px] text-[16px] font-medium text-white bg-[#2e6650] hover:bg-[#1a382c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[14px] leading-[100%] text-[#1a382c] hover:text-[#2e6650] font-sora">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}