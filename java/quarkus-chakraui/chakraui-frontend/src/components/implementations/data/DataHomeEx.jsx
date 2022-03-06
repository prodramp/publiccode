import React from 'react';
import {
    Box, VStack, Text,
    Link,
    Code,
    Grid,
  } from '@chakra-ui/react';
import { withRouter } from 'react-router';
import GetRestObject from '../../../api/ServerConnectGet';
import PostRestObject from '../../../api/ServerConnectPost';

class DataHomeEx extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            backendData: {},
            versionData:{},
            backendPostData:{},
        }
    }

    componentDidMount(){
        this.GetHelloDetails();
        this.GetVersionDetails();
        this.PostHelloDetails();
    }

    GetHelloDetails = () => {
        GetRestObject.GetRestRequest(`/v1/hello`, getResultObj => {
          this.setState({
            backendData: getResultObj
          })
        });
    }

    GetVersionDetails = () => {
        GetRestObject.GetRestRequest(`/v1/version`, getResultObj => {
          this.setState({
            versionData: getResultObj
          })
        });
    }

    PostHelloDetails = () => {
        var postBody = {'postParam': 'Chakra UI and Quarkus'};
        PostRestObject.PostRestRequest(`/v1/hello`,  postBody, getResultObj => {
          this.setState({
            backendPostData: getResultObj
          })
        }); 
    }


    render() {
        return(
            <VStack w="100%">
                <Box w="100%" textAlign="center" fontSize="xl">
                    <Text fontSize={'5xl'}>
                        I am from Data Home today
                    </Text>
                    <Text>
                        {JSON.stringify(this.state.backendData)}
                    </Text>
                    <Text>
                        Message: {this.state.versionData.message}
                    </Text>
                    <Text>
                        Status: {this.state.versionData.status}
                    </Text>
                    <Text>
                        {JSON.stringify(this.state.backendPostData)}
                    </Text>

                </Box>
            </VStack>
        )
    }
}

