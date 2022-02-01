import React from 'react';
import {
    Box, VStack, Text, Button,
    Link,
    Code,
    Grid,
  } from '@chakra-ui/react';
import { withRouter } from 'react-router';
import GetRestObject from '../../../api/ServerConnectGet';
import PostRestObject from '../../../api/ServerConnectPost';


class DataHomeEx extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            backendData:{},
            resultMessage:null,
        };
    }

    componentDidMount() {
        this.HelloGetRequestedDetails()
        this.GetRequestedDetailsInfo()
        this.PostRequestedDetails()
    }

    HelloGetRequestedDetails = () => {
        GetRestObject.GetRestRequest(`/v1/hello`, getResultObj => {
          console.log(getResultObj);
        });
    }

    GetRequestedDetailsInfo = () => {
        GetRestObject.GetRestRequest(`/v1/info`, getResultObj => {
          console.log(getResultObj);
        });
    }

    PostRequestedDetails = () => {
        var postData = {
          RequestType: 'api',
          RequestJson: {'param':'Chakra UI with Python'}
        }    
        PostRestObject.PostRestRequest(`/v1/info`, postData, postResultObj => {
          console.log(postResultObj);
          this.setState({
            backendData:postResultObj
          })
        });
    }


    showMessage = () => {
        if (this.state.backendData.status != null 
            && this.state.backendData.status === 'SUCCESS'){
                this.setState({
                    resultMessage:this.state.backendData.message
                })
            }
    }

    render() {
        return(
            <VStack w="100%">
                <Box w="100%" textAlign="center" fontSize="xl">
                    <Text fontSize={'5xl'}>
                        I am from Data Home (today)
                    </Text>
                    <Text>
                        {JSON.stringify(this.state.backendData)}
                    </Text>
                    <Button onClick={this.showMessage.bind(this)}>
                        Click me to get Message
                    </Button>
                    {this.state.resultMessage != null
                    ?<Text color={'green.400'}>
                        {this.state.resultMessage}
                    </Text>:<Text color={'red'}>No message</Text>}
                </Box>
            </VStack>
        )
    }
}

export default withRouter(DataHomeEx);