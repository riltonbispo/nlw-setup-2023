import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])


  async function createNewHabit(event: FormEvent){
    event.preventDefault()

    if(!title || weekDays.length === 0){
      return
    } 

    await api.post('habits', {
      title,
      weekDays,
    })

    setTitle('')
    setWeekDays([])

    alert('habito criado com sucesso ')
  }

  function handlToggleWeekDay(weekDay: number){
    if(weekDays.includes(weekDay)){
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
      
      setWeekDays(weekDaysWithRemovedOne)
    }else{
      const weekDaysWithRemovedOne = [...weekDays, weekDay]
      setWeekDays(weekDaysWithRemovedOne)
    }
  }

  
  return (
    <form   onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu compromentimento
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercicios, dormir, caminhar..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4 ">
        Qual a recorrencia?
      </label>

      <div className="flex flex-col mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (

            <Checkbox.Root 
              key={weekDay}  
              className="flex items-center gap-3 group "
              checked={weekDays.includes(index)}
              onCheckedChange={()=>{
                handlToggleWeekDay(index)
              }}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500 ">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{weekDay}</span>
            </Checkbox.Root>
            
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center font-semibold bg-green-600 gap-3 hover:bg-green-500 "
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
