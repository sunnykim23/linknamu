import { links, type LinkId } from '@/src/lib/links';
import { getLinkClicksCollection } from '@/src/lib/mongodb';

const linkIds = links.map((link) => link.id);

export async function GET() {
  try {
    const collection = await getLinkClicksCollection();
    const documents = await collection
      .find({ _id: { $in: [...linkIds] } })
      .toArray();
    const counts = Object.fromEntries(linkIds.map((id) => [id, 0])) as Record<LinkId, number>;

    for (const document of documents) {
      if (linkIds.includes(document._id as LinkId)) {
        counts[document._id as LinkId] = document.clicks;
      }
    }

    return Response.json(
      { counts },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  } catch (error) {
    console.error('Failed to load link click counts from MongoDB', error);
    return Response.json({ error: '클릭 수를 불러오지 못했습니다.' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: '요청 본문이 올바른 JSON이 아닙니다.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null || !('id' in body)) {
    return Response.json({ error: '유효한 링크 ID가 필요합니다.' }, { status: 400 });
  }

  const id = body.id;
  if (typeof id !== 'string' || !linkIds.includes(id as LinkId)) {
    return Response.json({ error: '등록되지 않은 링크 ID입니다.' }, { status: 400 });
  }

  try {
    const collection = await getLinkClicksCollection();
    await collection.updateOne({ _id: id }, { $inc: { clicks: 1 } }, { upsert: true });
    return Response.json({ success: true });
  } catch (error) {
    console.error(`Failed to increment click count for link "${id}"`, error);
    return Response.json({ error: '클릭 수를 저장하지 못했습니다.' }, { status: 503 });
  }
}
