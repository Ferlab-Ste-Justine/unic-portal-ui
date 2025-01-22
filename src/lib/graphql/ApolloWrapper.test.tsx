import { gql, useQuery } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

const GET_EXAMPLE_DATA = gql`
  query getExamples {
    examples {
      id
      name
    }
  }
`;

const ExamplePage = () => {
  const { data, loading, error } = useQuery(GET_EXAMPLE_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Example Data</h1>
      <ul>
        {data.examples.map((example: { id: string; name: string }) => (
          <li key={example.id}>{example.name}</li>
        ))}
      </ul>
    </div>
  );
};

const mocks = [
  {
    request: {
      query: GET_EXAMPLE_DATA,
    },
    result: {
      data: {
        examples: [{ id: '1', name: 'Test Example' }],
      },
    },
  },
];

test('renders example data', async () => {
  const { findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ExamplePage />
    </MockedProvider>,
  );

  expect(await findByText('Test Example')).toBeInTheDocument();
});
