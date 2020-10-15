import * as React from 'react';
import { View} from 'react-native';
import NewJournalEntrySheet from "./Components/NewJournalEntrySheet";
import { DefaultTheme, Provider as PaperProvider, Snackbar} from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import JournalViewer from "./Components/JournalViewer"
import { store, persistor } from "./Redux/store.js"


const theme = {

    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme,
        text: "#D5CBA8",
        subtext: "#918b73",
        background: "#2c2627",
        background_main: "#151414",
        background_sheet:'#2c2627',
        disabled: "#78686B",
        placeholder: "#78686B",
        error: "#db6143",
        primary: "#DABC61",
        accent: "#a5ffd6",
        recordingButton: "#db5a44"
    }
}


export default function App() {

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ActionSheetProvider>
                        <PaperProvider theme={theme}>
                            <View>

                                {// Router / Navigation here
                                    //
                                }
                               
                                <NewJournalEntrySheet>
                                    <JournalViewer />
                                    <Snackbar wrapperStyle={{position: "absolute", left: 0, bottom: 500}}> Journal Entry Saved! </Snackbar>
                                </NewJournalEntrySheet>
                                
                            </View>
                        </PaperProvider>
                    </ActionSheetProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
