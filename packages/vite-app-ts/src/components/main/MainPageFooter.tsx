import React from 'react'
import { ChakraProvider, Link, Text, Divider } from '@chakra-ui/react'

const MainPageFooter = () => (
  <ChakraProvider resetCSS>
    <Link href="https://github.com/Hacking-Web3/Licenses-DAO" isExternal mb={5}>
      Github link
    </Link>
    <Divider
      borderColor="blackAlpha.500"
      pt={5}
      fontWeight="bold"
      color="#bfa9a0"
    />
    <Text pt={5} opacity={1} color="#bfa9a0" fontSize="sm">
      LICENSES DAO IS NOT A LAW FIRM AND DOES NOT PROVIDE LEGAL SERVICES.
      DISTRIBUTION OF ANY DOCUMENTS AND PROPOSALS FROM THIS PAGE DOES NOT CREATE
      AN ATTORNEY-CLIENT RELATIONSHIP. LICENSES DAO PROVIDES THIS INFORMATION ON
      AN "AS-IS" BASIS AND MAKES NO WARRANTIES REGARDING THE USE OF THE
      DOCUMENTS AND PROPOSALS FOUND ON THIS PAGE OR THE INFORMATION OR WORKS
      PROVIDED HEREUNDER, AND DISCLAIMS LIABILITY FOR DAMAGES RESULTING FROM THE
      USE OF ANY SUCH CONTENT PROVIDED HEREUNDER.
    </Text>
  </ChakraProvider>
)
export default MainPageFooter