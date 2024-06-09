import React, { useState } from 'react';
import { Box, Button, Container, Input, Table, Thead, Tbody, Tr, Th, Td, Flex, Heading } from '@chakra-ui/react';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';

const CSVUploader = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setHeaders(Object.keys(results.data[0]));
          setData(results.data);
        },
      });
    }
  };

  const handleInputChange = (rowIndex, columnName, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnName] = value;
    setData(updatedData);
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="xl">CSV Uploader</Heading>
        <Button as={CSVLink} data={data} filename={"edited_data.csv"} colorScheme="teal">
          Download CSV
        </Button>
      </Flex>
      <Box mb={4}>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
      </Box>
      {data.length > 0 && (
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                {headers.map((header, index) => (
                  <Th key={index}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <Td key={colIndex}>
                      <Input
                        value={row[header]}
                        onChange={(e) => handleInputChange(rowIndex, header, e.target.value)}
                      />
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Container>
  );
};

export default CSVUploader;