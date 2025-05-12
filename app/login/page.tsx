"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Here you would add your authentication logic
    // For example, call your API to authenticate the user
    
    // For demo purposes, just redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleFacebookLogin = () => {
    // Implement Facebook OAuth login
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col gap-[49px] items-center p-20 justify-center bg-[#ffff]">
      <div>
        <Image 
            src="/img/logobigw.png" 
            alt="FarmLand Logo" 
            width={198} 
            height={30} 
            className="mx-auto"
          />
      </div>
      <div className="w-full max-w-[580px] p-8 space-y-8 bg-white rounded-[16px] border-[1px] border-[#e8e8e8] ">
        <div className="text-center">
          <h2 className="mt-6 text-[#606060] text-[32px] leading-[100%] font-normal font-sora">Welcome back!</h2>
          <p className="mt-2 text-sm font-sora text-[#606060] text-[16px] leading-[24px] font-normal">
            Kindly fill in your details to login to your acccount
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
            onClick={handleGoogleLogin}
            className="w-full max-w-[238px] heigth-[56px] flex items-center p-[8px] gap-[8px] justify-center px-1 border border-[#e0e0e0] rounded-[56px] bg-[#fafafa] hover:bg-gray-50 transition"
            disabled={isLoading}
          >
            <Image src="/icons/google.png" alt="Google" width={20} height={20} />
            <span className="font-sora text-[#4f4f4f] text-[16px] leading-[100%] font-normal  ">Login with Google</span>
          </button>

            <button
            onClick={handleFacebookLogin}
            className="w-full max-w-[238px] heigth-[56px] flex items-center p-[8px] gap-[8px] justify-center px-1 border border-[#e0e0e0] rounded-[56px] bg-[#fafafa] hover:bg-gray-50 transition"
            disabled={isLoading}
          >
            <Image src="/icons/facebook.png" alt="Google" width={20} height={20} />
            <span className="font-sora text-[#4f4f4f] text-[16px] leading-[100%] font-normal  ">Login with Facebook</span>
          </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder='Enter your password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-[14px] leading-[100%] text-[#1a382c] hover:text-[#2e6650] font-sora">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-[500px] height-[56px] flex justify-center py-2 px-4 border border-transparent rounded-[56px] text-[16px] font-medium text-white bg-[#2e6650] hover:bg-[#1a382c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-[14px] leading-[100%] text-[#1a382c] hover:text-[#2e6650] font-sora">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}