import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Button, TextInput, Title, withTheme} from "react-native-paper";
import 'react-native-get-random-values';
import DrawingForm from "./Drawing/DrawingForm";
import AudioForm from "./VoiceRecording/AudioForm";
import SliderForm from "../Controls/SliderForm";
import HorizontalRule from "../Display/HorizontalRule";
import DatePickerForm from "../Controls/DatePickerForm";
import TagPickerForm from "../Tags/TagPicker/TagPickerForm";
import {useDispatch} from "react-redux";

const NewJournalEntryForm = (props) => {
    const { control, handleSubmit, errors } = useForm({
        mode: "onChange"
    });
    const [drawingOpen, setDrawingOpen] = useState(false)

    const dispatch = useDispatch();
    
    const onSubmit = data => {
        // Save entry, then notify user.
        // TODO update state while saving entry
        //JournalDatabase.saveEntry(data).then((entryId) => console.log("entry id: ", entryId))
        //Haptics.notificationAsync("success")
        dispatch({type: "INSERT", object: "JOURNAL", data: data})
        props.onSubmit()
    }

    return(
        <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
            <ScrollView
            canCancelContentTouches={!drawingOpen}
            showsVerticalScrollIndicator={false}>
            <Title style={{fontSize: 30, fontWeight: 'bold'}}>
                New Entry
            </Title>

            <HorizontalRule />

            <Title style={{fontSize:20, marginBottom: 5, marginTop: 20}}>
                Describe your dream
            </Title>
            <Controller
                name="description"
                control={control}
                defaultValue={""}
                render={(props) =>
                    <TextInput
                        {...props}
                        mode={"outlined"}
                        label={"Description"}
                        multiline={true}
                        error={errors.description}
                        onChangeText={(value) => {props.onChange(value)}}
                        value={props.value}
                    />}
            />

            <Controller
                    name="title"
                    control={control}
                    defaultValue={""}
                    rules={{required: true}}
                    render={(props) =>
                        <TextInput
                            {...props}
                            mode={"outlined"}
                            label={"Title"}
                            onChangeText={(value) => {props.onChange(value)}}
                            value={props.value}
                            error={errors.title}
                        />}
                />

            <Controller
                name={"drawings"}
                control={control}
                defaultValue={[]}
                render={(props) => (
                    <DrawingForm
                        onChange={(data) => props.onChange(data)}
                        onOpenChange={(val) => setDrawingOpen(val)}
                    />
                )}
                />

                <Controller
                    name={"audioRecordings"}
                    control={control}
                    defaultValue={[]}
                    render={(props) => (
                        <AudioForm
                        onChange={(data) => props.onChange(data)}/>
                    )}
                />

                <Title style={{fontSize:20, marginBottom: 5, marginTop: 20}}>
                    Rate your dream
                </Title>

                <Controller
                    name="vividness"
                    control={control}
                    rules={{required: true}}
                    defaultValue={5}
                    render={(props) =>
                        <SliderForm onChange={(data) => props.onChange(data)} value={props.value} label={"Vividness"} />
                    }
                />

                <Controller
                    name="lucidity"
                    control={control}
                    rules={{required: true}}
                    defaultValue={5}
                    render={(props) =>
                        <SliderForm onChange={(data) => props.onChange(data)} value={props.value} label={"Lucidity"} />
                    }
                />

                <Title style={{fontSize:20, marginBottom: 5, marginTop: 20}}>
                    Details
                </Title>

                

                <Controller
                    name="tags"
                    control={control}
                    rules={{required: true}}
                    defaultValue={[]}
                    render={(props) =>
                       <TagPickerForm 
                        updateValue={(data) => props.onChange(data)}
                        value={props.value}
                       />
                    }
                />



                <Controller
                    name="date"
                    control={control}
                    rules={{required: true}}
                    defaultValue={new Date()}
                    render={(props) =>
                        <DatePickerForm
                            onChange={(date) => props.onChange(date)}
                            date={props.value}
                        />
                    }
                />

                <Button
                    type={"submit"}
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    labelStyle={{fontSize: 15, fontWeight: "bold", padding: 10}}
                    style={{marginTop: 30}}
                    color={props.theme.colors.primary}
                >
                    Record Dream
                </Button>
            </ScrollView>
        </View>
    )
}


export default withTheme(NewJournalEntryForm);
