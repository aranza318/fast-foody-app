import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions } from 'react-native'
import categories from '../data/categories.json'
import FlatCard from '../components/FlatCard'
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../global/colors'
import MyTypoText from '../components/MyTypoText'

const CategoriesScreens = ({navigation}) => {
    
    const {width,height}= useWindowDimensions()
    const [isPortrait, setIsPortrait]= useState(true)

    useEffect(()=>{
        if(width>height){
            setIsPortrait(false)
        }else{
            setIsPortrait(true)
        }
    }, [width, height])
    console.log(isPortrait)
    const renderCategoryItem = ({item,index}) =>{
        return(
            
            <Pressable onPress={()=> navigation.navigate('Productos', item.title)}> 
            <FlatCard 
            style= {
                index%2==0
                ?
                {...styles.categoriesItemContainer, ...styles.row}
                :
                {...styles.categoriesItemContainer, ...styles.rowReverse}
            }>
            <Image 
            source={{uri:item.image}}
            style={styles.image}
            resizeMode= 'contain'
            />
            <MyTypoText style= {styles.categoryTitle}>{item.title}</MyTypoText>
            </FlatCard>
            </Pressable>
           
        )
    }
    return (
    <>
    <LinearGradient style={styles.try} colors={["#00cbf9","#090979"]} start={{x:0, y:0}} end={{x:1, y:1}}>
      <FlatList 
      data={categories}
      keyExtractor= {item => item.id}
      renderItem= {renderCategoryItem}/>
      </LinearGradient>
    </>
  )
}

export default CategoriesScreens

const styles = StyleSheet.create({
   
    categoriesItemContainer:{
        justifyContent:"space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
        color: colors.white
    },
    categoryTitle:{
        fontSize:31,
        fontWeight:"bold",
        color: colors.white
    },
    image:{
        width:150,
        height:80,
    },
    row:{
        flexDirection:'row'
    },
    rowReverse:{
        flexDirection: 'row-reverse'
    }
})

const stylesSmall = StyleSheet.create({
    categoryTitle:{
        fontSize:12,
        fontWeight:"bold"
    }
})