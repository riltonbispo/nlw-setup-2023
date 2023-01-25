import { Alert, ScrollView, Text, TextInput,TouchableOpacity,View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 
                          'Segunda-feira',
                          'Terça-feira',
                          'Quarta-feira', 
                          'Quinta-feira', 
                          'Sexta-feira',
                          'Sabado'
                        ]

export function New (){
  const [title, setTitle] = useState('')
  const[weekDays, setWeekDays ]= useState<number[]>([])
  
  function handleToggleWeekDay(weedDayIndex: number){
    if (weekDays.includes(weedDayIndex)){
      setWeekDays(prevState=> prevState.filter(weekDay => weekDay !== weedDayIndex))
    } else{
      setWeekDays(prevState =>[...prevState, weedDayIndex] )
    }
  }

  async function handleCreateNewHabit(){
    try{
      if(!title.trim || weekDays.length === 0){
        Alert.alert("Novo Habito", "Informe a nome do Habito e os dias")
      }

      await api.post('/habits',{title, weekDays})
      setTitle('')
      setWeekDays([])

      Alert.alert("Novo Habito", "Habito criado!")
    }catch(error){
      console.log(error)
      Alert.alert("Ops", "Nao foi possivel criar o habito")
    }
  }

  return(
    <View className="flex-1 bg-background px-8 pt-16" >
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{paddingBottom: 100 }}
      >
        <BackButton/>

        <Text className="mt-6 text-white font-extrabold text-3xl" >
          Criar Habito
        </Text>

        <Text className="mt-6 text-white font-semibolde text-base" >
          Qual seu compromentimento
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600  "
          placeholder="Ler, caminhar, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base" >
          Qual a recorrencia
        </Text>

        {
          availableWeekDays.map((weekDay, index) =>(
            <Checkbox 
              key={weekDay}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={()=> handleToggleWeekDay(index)}
            />
          ))
        }

        <TouchableOpacity 
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-lg mt-6" 
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-2" >
            Confirmar
          </Text>

        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}