'use client';
import { useQueryState } from '@/hooks/query-state-optimized';
import { api } from '@/store';
import { GetPostsRequest, Sort } from '@/types/posts';

export default function Home() {
  // const { isAuthenticated, logout } = useAuth();
  // const router = useRouter();

  const [filters, setFilters] = useQueryState<GetPostsRequest>({
    _limit: '10',
    _page: '1',
    _sort: Sort.TITLE,
    _order: 'asc',
  });

  const { data } = api.usePostsQuery(filters);

  console.log(data);

  return (
    <div>
      <select
        value={filters._sort}
        onChange={(e) =>
          setFilters({ ...filters, _sort: e.target.value as Sort })
        }
      >
        {Object.entries(Sort).map(([key, value]) => (
          <option value={value} key={key}>
            {key}
          </option>
        ))}
      </select>

      <select
        value={filters._order}
        onChange={(e) =>
          setFilters({ ...filters, _order: e.target.value as 'asc' | 'desc' })
        }
      >
        <option value='asc'>Ascending</option>
        <option value='desc'>Descending</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
