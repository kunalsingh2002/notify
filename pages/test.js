import React, { useState, useEffect } from 'react'
import { Select } from '@mantine/core';
import { Button } from '@mantine/core';

const Test = () => {
  const [chosenformat, setchosenformat] = useState()
  useEffect(() => {
    console.log(chosenformat)
  })
  
  return (
    <div>
      <Button key = "1234" onClick={(event) => {event.preventDefault(); console.log("lauda")}} size="md">
                    Settings
                </Button>
    </div>
    // <div>
    //   <Select
    //   label="Your favorite framework/library"
    //   placeholder="Pick one"
    //   data={[
    //     { value: 'react', label: 'React' },
    //     { value: 'ng', label: 'Angular' },
    //     { value: 'svelte', label: 'Svelte' },
    //     { value: 'vue', label: 'Vue' },
    //   ]}
    //   value = {chosenformat}
    //   onChange={setchosenformat}
    // />
      
    // </div>

  )
}

export default Test