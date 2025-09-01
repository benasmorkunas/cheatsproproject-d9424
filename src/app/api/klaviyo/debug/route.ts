import { NextRequest, NextResponse } from 'next/server';
import { ApiKeySession, EventsApi, ProfilesApi } from 'klaviyo-api';

export async function GET() {
  try {
    const apiKey = process.env.KLAVIYO_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'No API key found',
      });
    }

    // Test basic connection
    const session = new ApiKeySession(apiKey);
    const profilesApi = new ProfilesApi(session);

    // Try to get profiles (this should work with any valid private key)
    try {
      const response = await profilesApi.getProfiles();
      
      return NextResponse.json({
        success: true,
        message: 'Klaviyo connection successful',
        apiKeyLength: apiKey.length,
        apiKeyStart: apiKey.substring(0, 8),
        profileCount: response.body?.data?.length || 0,
      });
    } catch (apiError: any) {
      return NextResponse.json({
        success: false,
        error: 'API call failed',
        details: apiError.message,
        status: apiError.status,
        apiKeyLength: apiKey.length,
        apiKeyStart: apiKey.substring(0, 8),
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Connection failed',
      details: error.message,
    });
  }
}