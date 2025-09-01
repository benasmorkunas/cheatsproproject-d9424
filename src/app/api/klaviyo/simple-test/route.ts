import { NextRequest, NextResponse } from 'next/server';
import { ApiKeySession, EventsApi } from 'klaviyo-api';

export async function POST() {
  try {
    const session = new ApiKeySession(process.env.KLAVIYO_API_KEY!);
    const eventsApi = new EventsApi(session);

    // Try to track a very simple event
    const eventData = {
      type: 'event' as const,
      attributes: {
        metric: {
          data: {
            type: 'metric' as const,
            attributes: {
              name: 'Test Event',
            },
          },
        },
        profile: {
          data: {
            type: 'profile' as const,
            attributes: {
              email: 'test@example.com',
            },
          },
        },
        properties: {
          testProperty: 'test value',
        },
        time: new Date(),
      },
    };

    const response = await eventsApi.createEvent({
      data: eventData,
    });

    return NextResponse.json({
      success: true,
      message: 'Simple event tracked successfully',
      response: response.body,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Failed to track simple event',
      details: error.message,
      status: error.status,
      body: error.response?.body,
    });
  }
}