package com.example.myapplication

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.tooling.preview.Preview
import com.example.myapplication.ui.theme.MyApplicationTheme

import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.runtime.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            ServerTextField()
        }
    }
}

@Composable
fun ServerTextField() {
    var textValue by remember { mutableStateOf(TextFieldValue()) }

    LaunchedEffect(textValue.text) {
        // Send the text to the server whenever it changes
        sendToServer(textValue.text)
    }
    Box(
    ) {
        Text(text ="textValue.text")
        TextField(
            value = textValue,
            onValueChange = {
                textValue = it
                // Print only the new portion of Text to the log Omit the Old Text
                println("New Text: ${it.text}")
            },
        )
    }

}

fun sendToServer(text: String) {
    // Replace this with your actual server communication code.
    // You might want to use Retrofit, OkHttp, or some other library to send data to the server.
    // In this example, we simply print the text to the log.
    println("Sending to server: $text")
}